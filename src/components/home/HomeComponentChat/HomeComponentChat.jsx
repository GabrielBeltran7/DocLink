
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  getDocs
} from "firebase/firestore"; // Firestore imports
import { db } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig"; // Firebase config
import { getAuth } from "firebase/auth"; // Firebase Auth
import * as Notifications from "expo-notifications"; // Expo Notifications
import * as Device from "expo-device"; // Para verificar el dispositivo
import styles from "./HomeComponentChatStyle";
import Icon from "react-native-vector-icons/FontAwesome";

function HomeComponentChat({ navigation, route }) {
  const [message, setMessage] = useState(""); // Para almacenar el mensaje actual
  const [messages, setMessages] = useState([]); // Para almacenar la lista de mensajes
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const auth = getAuth(); // Obtener información del usuario actual

  const user = auth.currentUser;
  const email = user.email; // Extraer el correo electrónico
  const currentUser = auth.currentUser ? auth.currentUser.uid : null; // ID del usuario actual

  const { documentNumber } = route.params; // Obtener el documentNumber desde params
  const { documentType } = route.params;

  const flatListRef = useRef(null); // Crear una referencia para el FlatList





  // Registrar el dispositivo para recibir notificaciones y guardar el token en Firestore
  const registerForPushNotifications = async () => {
    // Verifica si el dispositivo es físico (no funciona en simuladores)
    if (Device.isDevice) {
      // Obtiene el estado de los permisos de notificaciones push actuales
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      // Si el permiso actual no ha sido concedido, solicita los permisos de notificaciones
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      // Si el usuario no concedió los permisos, muestra una alerta y termina la función
      if (finalStatus !== 'granted') {
        alert('¡No se pudieron obtener permisos para notificaciones push!');
        return;
      }
  
      // Si se otorgaron los permisos, obtiene el token de notificación push del dispositivo
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Push token:", token);
  
      
      // Consulta los tokens existentes en Firestore para verificar si ya existe el token del usuario actual
      const tokensSnapshot = await getDocs(collection(db, "groupChats", documentNumber, "tokens"));
      const existingTokenDoc = tokensSnapshot.docs.find(doc => doc.data().userId === currentUser);
  
      if (existingTokenDoc) {
        // Si el token ya existe en Firestore, lo actualiza
        await updateDoc(existingTokenDoc.ref, {
          pushToken: token
        });
        console.log("Token actualizado en Firestore.");
      } else {
        // Si no existe un token previo, agrega un nuevo documento con el token del usuario actual en Firestore
        try {
          await addDoc(collection(db, "groupChats", documentNumber, "tokens"), {
            pushToken: token,
            userId: currentUser,
          });
          console.log("Token guardado en Firestore.");
        } catch (error) {
          // Captura y muestra cualquier error que ocurra al intentar guardar el token
          console.error("Error al guardar el token en Firestore: ", error);
        }
      }
    } else {
      // Si el código se está ejecutando en un simulador o emulador, muestra una alerta
      alert('Debe usar un dispositivo físico para recibir notificaciones push.');
    }
  };
  




  // Obtener tokens de los usuarios del chat
  const getGroupTokens = async () => {
    try {
      const tokensSnapshot = await getDocs(
        collection(db, "groupChats", documentNumber, "tokens")
      );
      const tokens = tokensSnapshot.docs.map((doc) => doc.data().pushToken);
      console.log("Tokens obtenidos: ", tokens);
      return tokens;
    } catch (error) {
      console.error("Error al obtener tokens: ", error);
      return [];
    }
  };

  // Enviar notificaciones push usando Expo Push Notification API
  const sendPushNotification = async (tokens, messageText) => {
    const messages = tokens.map((token) => ({
      to: token,
      sound: "default",
      title: "Nuevo mensaje en el chat",
      body: messageText,
      data: { someData: "goes here" },
    }));

    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
      });

      const data = await response.json();
      console.log("Respuesta de envío de notificación: ", data); // Log para verificar respuesta de Expo
    } catch (error) {
      console.error("Error al enviar notificación push:", error);
    }
  };

  // Enviar mensaje a Firestore y notificación
  const sendMessage = async () => {
    if (message.trim().length > 0 && currentUser) {
      try {
        // Almacenar mensaje en Firestore
        await addDoc(collection(db, "groupChats", documentNumber, "messages"), {
          text: message,
          timestamp: new Date(), // Almacena la fecha y hora actual
          senderId: currentUser, // ID del remitente
          senderEmail: email, // Guarda el correo electrónico del remitente
          deliveredTo: [], // Inicialmente no ha sido entregado a nadie
          readBy: [currentUser], // El propio remitente ha leído su mensaje
        });
        console.log("Mensaje enviado a Firestore");

        // Obtener tokens y enviar notificación
        const tokens = await getGroupTokens();
        if (tokens.length > 0) {
          await sendPushNotification(tokens, message);
        }

        setMessage(""); // Limpiar el input después de enviar
      } catch (error) {
        console.error("Error al enviar mensaje: ", error); // Manejo de errores
      }
    }
  };

  // Escuchar los mensajes en tiempo real desde Firestore
  useEffect(() => {
    if (!documentNumber) return; // Asegúrate de que documentNumber esté definido
    const chatRef = collection(db, "groupChats", documentNumber, "messages"); // Subcolección de mensajes basada en el documentNumber
    const q = query(chatRef, orderBy("timestamp", "asc")); // Query ordenada por timestamp
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesList); // Actualiza la lista de mensajes
      setLoading(false); // Cambiar el estado de carga a false
      console.log("Mensajes recibidos: ", messagesList); // Ver los mensajes recibidos

      // Marcar los mensajes como leídos y entregados cuando se reciben
      messagesList.forEach((message) => {
        if (
          message.senderId !== currentUser &&
          !message.readBy?.includes(currentUser)
        ) {
          updateDoc(
            doc(db, "groupChats", documentNumber, "messages", message.id),
            {
              readBy: [...(message.readBy || []), currentUser], // Agregar el userId a los que han leído
            }
          );
          console.log("Mensaje marcado como leído: ", message.id);
        }

        if (
          message.senderId !== currentUser &&
          !message.deliveredTo?.includes(currentUser)
        ) {
          updateDoc(
            doc(db, "groupChats", documentNumber, "messages", message.id),
            {
              deliveredTo: [...(message.deliveredTo || []), currentUser], // Agregar el userId a los que han recibido
            }
          );
          console.log("Mensaje marcado como entregado: ", message.id);
        }
      });
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, [documentNumber]);

  // Desplazar automáticamente al último mensaje cuando se agreguen nuevos mensajes
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true }); // Desplazar al final
      console.log("Desplazando a la última posición de mensajes");
    }
  }, [messages]); // Ejecutar cada vez que los mensajes cambien

  const renderMessage = ({ item }) => {
    const messageTime =
      item.timestamp && item.timestamp.seconds
        ? new Date(item.timestamp.seconds * 1000)
        : new Date();

    const isDelivered = item.deliveredTo && item.deliveredTo.length > 0;
    const isRead = item.readBy && item.readBy.length > 1; // Leído por alguien más

    return (
      <View
        style={
          item.senderId === currentUser
            ? styles.sentMessage
            : styles.receivedMessage
        }
      >
        <Text
          style={
            item.senderId === currentUser
              ? styles.senderNameMe
              : styles.senderName
          }
        >
          {item.senderId === currentUser ? email : item.senderEmail}
        </Text>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>
          {messageTime.toLocaleTimeString()}
        </Text>

        {item.senderId === currentUser && (
          <View style={styles.checkIconContainer}>
            {!isDelivered && <Icon name="check" size={18} color="#999" />}
            {isDelivered && !isRead && (
              <View style={styles.checksWrapper}>
                <Icon name="check" size={18} color="#999" />
                <Icon name="check" size={18} color="#999" />
              </View>
            )}
            {isRead && (
              <View style={styles.checksWrapper}>
                <Icon name="check" size={18} color="#4FC3F7" />
                <Icon name="check" size={18} color="#4FC3F7" />
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const isSendButtonDisabled = !message.trim() || !currentUser;

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  // Registrar para notificaciones push al montar el componente
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.chatTitle}>
        {capitalizeFirstLetter(documentType)} {documentNumber}
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            isSendButtonDisabled && styles.disabledButton,
          ]}
          onPress={sendMessage}
          disabled={isSendButtonDisabled}
        >
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeComponentChat;





// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   updateDoc,
//   doc,
//   getDocs
// } from "firebase/firestore"; // Firestore imports
// import { db } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig"; // Firebase config
// import { getAuth } from "firebase/auth"; // Firebase Auth
// import * as Notifications from "expo-notifications"; // Expo Notifications
// import * as Device from "expo-device"; // Para verificar el dispositivo
// import styles from "./HomeComponentChatStyle";
// import Icon from "react-native-vector-icons/FontAwesome";

// function HomeComponentChat({ navigation, route }) {
//   const [message, setMessage] = useState(""); // Para almacenar el mensaje actual
//   const [messages, setMessages] = useState([]); // Para almacenar la lista de mensajes
//   const [loading, setLoading] = useState(true); // Para manejar el estado de carga
//   const auth = getAuth(); // Obtener información del usuario actual

//   const user = auth.currentUser;
//   const email = user.email; // Extraer el correo electrónico
//   const currentUser = auth.currentUser ? auth.currentUser.uid : null; // ID del usuario actual

//   const { documentNumber } = route.params; // Obtener el documentNumber desde params
//   const { documentType } = route.params;

//   const flatListRef = useRef(null); // Crear una referencia para el FlatList





//   // Registrar el dispositivo para recibir notificaciones y guardar el token en Firestore
//   const registerForPushNotifications = async () => {
//     // Verifica si el dispositivo es físico (no funciona en simuladores)
//     if (Device.isDevice) {
//       // Obtiene el estado de los permisos de notificaciones push actuales
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
  
//       // Si el permiso actual no ha sido concedido, solicita los permisos de notificaciones
//       if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
  
//       // Si el usuario no concedió los permisos, muestra una alerta y termina la función
//       if (finalStatus !== 'granted') {
//         alert('¡No se pudieron obtener permisos para notificaciones push!');
//         return;
//       }
  
//       // Si se otorgaron los permisos, obtiene el token de notificación push del dispositivo
//       const token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log("Push token:", token);
  
      
//       // Consulta los tokens existentes en Firestore para verificar si ya existe el token del usuario actual
//       const tokensSnapshot = await getDocs(collection(db, "groupChats", documentNumber, "tokens"));
//       const existingTokenDoc = tokensSnapshot.docs.find(doc => doc.data().userId === currentUser);
  
//       if (existingTokenDoc) {
//         // Si el token ya existe en Firestore, lo actualiza
//         await updateDoc(existingTokenDoc.ref, {
//           pushToken: token
//         });
//         console.log("Token actualizado en Firestore.");
//       } else {
//         // Si no existe un token previo, agrega un nuevo documento con el token del usuario actual en Firestore
//         try {
//           await addDoc(collection(db, "groupChats", documentNumber, "tokens"), {
//             pushToken: token,
//             userId: currentUser,
//           });
//           console.log("Token guardado en Firestore.");
//         } catch (error) {
//           // Captura y muestra cualquier error que ocurra al intentar guardar el token
//           console.error("Error al guardar el token en Firestore: ", error);
//         }
//       }
//     } else {
//       // Si el código se está ejecutando en un simulador o emulador, muestra una alerta
//       alert('Debe usar un dispositivo físico para recibir notificaciones push.');
//     }
//   };
  




//   // Obtener tokens de los usuarios del chat
//   const getGroupTokens = async () => {
//     try {
//       const tokensSnapshot = await getDocs(
//         collection(db, "groupChats", documentNumber, "tokens")
//       );
//       const tokens = tokensSnapshot.docs.map((doc) => doc.data().pushToken);
//       console.log("Tokens obtenidos: ", tokens);
//       return tokens;
//     } catch (error) {
//       console.error("Error al obtener tokens: ", error);
//       return [];
//     }
//   };

//   // Enviar notificaciones push usando Expo Push Notification API
//   const sendPushNotification = async (tokens, messageText) => {
//     const messages = tokens.map((token) => ({
//       to: token,
//       sound: "default",
//       title: "Nuevo mensaje en el chat",
//       body: messageText,
//       data: { someData: "goes here" },
//     }));

//     try {
//       const response = await fetch('https://exp.host/--/api/v2/push/send', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(messages),
//       });

//       const data = await response.json();
//       console.log("Respuesta de envío de notificación: ", data); // Log para verificar respuesta de Expo
//     } catch (error) {
//       console.error("Error al enviar notificación push:", error);
//     }
//   };

//   // Enviar mensaje a Firestore y notificación
//   const sendMessage = async () => {
//     if (message.trim().length > 0 && currentUser) {
//       try {
//         // Almacenar mensaje en Firestore
//         await addDoc(collection(db, "groupChats", documentNumber, "messages"), {
//           text: message,
//           timestamp: new Date(), // Almacena la fecha y hora actual
//           senderId: currentUser, // ID del remitente
//           senderEmail: email, // Guarda el correo electrónico del remitente
//           deliveredTo: [], // Inicialmente no ha sido entregado a nadie
//           readBy: [currentUser], // El propio remitente ha leído su mensaje
//         });
//         console.log("Mensaje enviado a Firestore");

//         // Obtener tokens y enviar notificación
//         const tokens = await getGroupTokens();
//         if (tokens.length > 0) {
//           await sendPushNotification(tokens, message);
//         }

//         setMessage(""); // Limpiar el input después de enviar
//       } catch (error) {
//         console.error("Error al enviar mensaje: ", error); // Manejo de errores
//       }
//     }
//   };

//   // Escuchar los mensajes en tiempo real desde Firestore
//   useEffect(() => {
//     if (!documentNumber) return; // Asegúrate de que documentNumber esté definido
//     const chatRef = collection(db, "groupChats", documentNumber, "messages"); // Subcolección de mensajes basada en el documentNumber
//     const q = query(chatRef, orderBy("timestamp", "asc")); // Query ordenada por timestamp
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const messagesList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMessages(messagesList); // Actualiza la lista de mensajes
//       setLoading(false); // Cambiar el estado de carga a false
//       console.log("Mensajes recibidos: ", messagesList); // Ver los mensajes recibidos

//       // Marcar los mensajes como leídos y entregados cuando se reciben
//       messagesList.forEach((message) => {
//         if (
//           message.senderId !== currentUser &&
//           !message.readBy?.includes(currentUser)
//         ) {
//           updateDoc(
//             doc(db, "groupChats", documentNumber, "messages", message.id),
//             {
//               readBy: [...(message.readBy || []), currentUser], // Agregar el userId a los que han leído
//             }
//           );
//           console.log("Mensaje marcado como leído: ", message.id);
//         }

//         if (
//           message.senderId !== currentUser &&
//           !message.deliveredTo?.includes(currentUser)
//         ) {
//           updateDoc(
//             doc(db, "groupChats", documentNumber, "messages", message.id),
//             {
//               deliveredTo: [...(message.deliveredTo || []), currentUser], // Agregar el userId a los que han recibido
//             }
//           );
//           console.log("Mensaje marcado como entregado: ", message.id);
//         }
//       });
//     });

//     return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
//   }, [documentNumber]);

//   // Desplazar automáticamente al último mensaje cuando se agreguen nuevos mensajes
//   useEffect(() => {
//     if (flatListRef.current && messages.length > 0) {
//       flatListRef.current.scrollToEnd({ animated: true }); // Desplazar al final
//       console.log("Desplazando a la última posición de mensajes");
//     }
//   }, [messages]); // Ejecutar cada vez que los mensajes cambien

//   const renderMessage = ({ item }) => {
//     const messageTime =
//       item.timestamp && item.timestamp.seconds
//         ? new Date(item.timestamp.seconds * 1000)
//         : new Date();

//     const isDelivered = item.deliveredTo && item.deliveredTo.length > 0;
//     const isRead = item.readBy && item.readBy.length > 1; // Leído por alguien más

//     return (
//       <View
//         style={
//           item.senderId === currentUser
//             ? styles.sentMessage
//             : styles.receivedMessage
//         }
//       >
//         <Text
//           style={
//             item.senderId === currentUser
//               ? styles.senderNameMe
//               : styles.senderName
//           }
//         >
//           {item.senderId === currentUser ? email : item.senderEmail}
//         </Text>
//         <Text style={styles.messageText}>{item.text}</Text>
//         <Text style={styles.messageTime}>
//           {messageTime.toLocaleTimeString()}
//         </Text>

//         {item.senderId === currentUser && (
//           <View style={styles.checkIconContainer}>
//             {!isDelivered && <Icon name="check" size={18} color="#999" />}
//             {isDelivered && !isRead && (
//               <View style={styles.checksWrapper}>
//                 <Icon name="check" size={18} color="#999" />
//                 <Icon name="check" size={18} color="#999" />
//               </View>
//             )}
//             {isRead && (
//               <View style={styles.checksWrapper}>
//                 <Icon name="check" size={18} color="#4FC3F7" />
//                 <Icon name="check" size={18} color="#4FC3F7" />
//               </View>
//             )}
//           </View>
//         )}
//       </View>
//     );
//   };

//   const isSendButtonDisabled = !message.trim() || !currentUser;

//   const capitalizeFirstLetter = (text) => {
//     if (!text) return "";
//     return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
//   };

//   // Registrar para notificaciones push al montar el componente
//   useEffect(() => {
//     registerForPushNotifications();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.chatTitle}>
//         {capitalizeFirstLetter(documentType)} {documentNumber}
//       </Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={(item) => item.id}
//           onContentSizeChange={() =>
//             flatListRef.current.scrollToEnd({ animated: true })
//           }
//         />
//       )}

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Escribe un mensaje..."
//           value={message}
//           onChangeText={(text) => setMessage(text)}
//         />
//         <TouchableOpacity
//           style={[
//             styles.sendButton,
//             isSendButtonDisabled && styles.disabledButton,
//           ]}
//           onPress={sendMessage}
//           disabled={isSendButtonDisabled}
//         >
//           <Text style={styles.sendButtonText}>Enviar</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// export default HomeComponentChat;

