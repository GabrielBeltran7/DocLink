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
} from "firebase/firestore"; // Firestore imports
import { db } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig"; // Firebase config
import { getAuth } from "firebase/auth"; // Firebase Auth
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

      // Marcar los mensajes como leídos cuando se reciben
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
        }
      });
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, [documentNumber]);

  // Desplazar automáticamente al último mensaje cuando se agreguen nuevos mensajes
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true }); // Desplazar al final
    }
  }, [messages]); // Ejecutar cada vez que los mensajes cambien

  // Enviar mensaje a Firestore
  const sendMessage = async () => {
    if (message.trim().length > 0 && currentUser) {
      // Asegúrate de que currentUser no sea null
      try {
        await addDoc(collection(db, "groupChats", documentNumber, "messages"), {
          text: message,
          timestamp: new Date(), // Almacena la fecha y hora actual
          senderId: currentUser, // ID del remitente
          senderEmail: email, // Guarda el correo electrónico del remitente
          deliveredTo: [], // Inicialmente no ha sido entregado a nadie
          readBy: [currentUser], // El propio remitente ha leído su mensaje
        });
        setMessage(""); // Limpiar el input después de enviar
      } catch (error) {
        console.error("Error al enviar mensaje: ", error); // Manejo de errores
      }
    }
  };

  // Renderizar cada mensaje en la lista
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="reply" size={20} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Por {capitalizeFirstLetter(documentType)}{" "}
          {documentNumber.toLowerCase()}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.chatContainer}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje"
          value={message}
          onChangeText={setMessage}
          multiline={true} // Permitir varias líneas
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={isSendButtonDisabled}
        >
          <Icon name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeComponentChat;
