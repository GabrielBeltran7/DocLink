import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore"; // Firestore imports
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
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, [documentNumber]);

  // Enviar mensaje a Firestore
  const sendMessage = async () => {
    if (message.trim().length > 0 && currentUser) { // Asegúrate de que currentUser no sea null
      try {
        await addDoc(collection(db, "groupChats", documentNumber, "messages"), {
          text: message,
          timestamp: new Date(), // Almacena la fecha y hora actual
          senderId: currentUser, // ID del remitente
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

    return (
      <View style={item.senderId === currentUser ? styles.sentMessage : styles.receivedMessage}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{messageTime.toLocaleTimeString()}</Text>
      </View>
    );
  };

  // Deshabilitar el botón de enviar si el mensaje está vacío
  const isSendButtonDisabled = !message.trim() || !currentUser;

  return (
    <View style={styles.container}>
      {/* Lista de mensajes */}
      <FlatList 
        data={messages} 
        renderItem={renderMessage} 
        keyExtractor={(item) => item.id} 
        style={styles.chatContainer} 
      />

      {/* Zona de entrada de texto */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Icon name="smile-o" size={24} color="#999" />
        </TouchableOpacity>
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

