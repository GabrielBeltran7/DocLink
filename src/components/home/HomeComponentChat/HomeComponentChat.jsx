import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore"; // Firestore imports
import { db } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig"; // Firebase config
import { getAuth } from "firebase/auth"; // Firebase Auth
import styles from "./HomeComponentChatStyle";
import Icon from 'react-native-vector-icons/FontAwesome'; 

function HomeComponentChat({ route }) {
  const [message, setMessage] = useState(""); // Para almacenar el mensaje actual
  const [messages, setMessages] = useState([]); // Para almacenar la lista de mensajes
  const auth = getAuth(); // Obtener información del usuario actual
  const currentUser = auth.currentUser ? auth.currentUser.uid : null; // ID del usuario actual
  const { documentNumber } = route.params; // Obtener el documentNumber desde params
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

      // Marcar los mensajes como leídos cuando se reciben
      messagesList.forEach((message) => {
        if (message.senderId !== currentUser && !message.readBy?.includes(currentUser)) {
          updateDoc(doc(db, "groupChats", documentNumber, "messages", message.id), {
            readBy: [...(message.readBy || []), currentUser], // Agregar el userId a los que han leído
          });
        }

        if (message.senderId !== currentUser && !message.deliveredTo?.includes(currentUser)) {
          updateDoc(doc(db, "groupChats", documentNumber, "messages", message.id), {
            deliveredTo: [...(message.deliveredTo || []), currentUser], // Agregar el userId a los que han recibido
          });
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
    if (message.trim().length > 0 && currentUser) { // Asegúrate de que currentUser no sea null
      try {
        await addDoc(collection(db, "groupChats", documentNumber, "messages"), {
          text: message,
          timestamp: new Date(), // Almacena la fecha y hora actual
          senderId: currentUser, // ID del remitente
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
    // Asegúrate de que el timestamp sea un objeto Date válido
    const messageTime = item.timestamp && item.timestamp.seconds 
      ? new Date(item.timestamp.seconds * 1000) // Convierte Firestore timestamp a Date
      : new Date(); // Si no hay timestamp, utiliza la fecha actual como respaldo

    const isDelivered = item.deliveredTo && item.deliveredTo.length > 0;
    const isRead = item.readBy && item.readBy.length > 1; // Leído por alguien más

    return (
      <View style={item.senderId === currentUser ? styles.sentMessage : styles.receivedMessage}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{messageTime.toLocaleTimeString()}</Text>

        {/* Icono de los checks para el estado de lectura */}
        {item.senderId === currentUser && (
          <View style={styles.checkIconContainer}>
            {/* Un solo check para enviado */}
            {!isDelivered && <Icon name="check" size={18} color="#999" />}
            
            {/* Dos checks grises para entregado */}
            {isDelivered && !isRead && (
              <View style={styles.checksWrapper}>
                <Icon name="check" size={18} color="#999" />
                <Icon name="check" size={18} color="#999" />
              </View>
            )}
            
            {/* Dos checks azules para leído */}
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

  // Deshabilitar el botón de enviar si el mensaje está vacío
  const isSendButtonDisabled = !message.trim() || !currentUser;

  return (
    <View style={styles.container}>
      {/* Lista de mensajes */}
      <FlatList 
        ref={flatListRef} // Asignar la referencia al FlatList
        data={messages} 
        renderItem={renderMessage} 
        keyExtractor={(item) => item.id} 
        style={styles.chatContainer} 
      />

      {/* Zona de entrada de texto */}
      <View style={styles.inputContainer}>
        {/* Eliminar el icono de la carita */}
        <TextInput 
          style={styles.input} 
          placeholder="Escribe un mensaje" 
          value={message} 
          onChangeText={setMessage} 
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={isSendButtonDisabled}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeComponentChat;
