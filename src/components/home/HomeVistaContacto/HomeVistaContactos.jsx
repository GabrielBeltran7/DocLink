import React, { useState } from "react"; 
import { View, Text, TouchableOpacity, Modal, Alert, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Para íconos de copiar
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Para el ícono de WhatsApp
import { useNavigation } from '@react-navigation/native'; 
import { getAuth } from "firebase/auth"; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDollarSign, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { deleteDocument } from "../../../Redux/Actions";
import * as Clipboard from 'expo-clipboard'; // Importa Clipboard de expo-clipboard
import styles from "./HomeVistaContactosStyle";

function HomeVistaContactos() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const documentState = useSelector((state) => state.documentidData) || {};
  const [modalVisible, setModalVisible] = useState(false);

  const namecontact = documentState.contactName; 
  const documentNumber = documentState.documentNumber; 
  const documentType = documentState.documentType;
  const documentsId = documentState.id;
  const otherUserId = documentState.otherUserId;

  const handleViewPress = () => {
    navigation.navigate('UpdateComponentsDocuments');
  };

  const auth = getAuth(); 
  const currentUser = auth.currentUser;
  const email = currentUser.email; 

  const handleViewComent = () => {
    navigation.navigate("HomeComponentChat", {
      documentNumber: documentNumber, 
      documentType: documentType,
      email: email
    });
  };

  const handleCollaboration = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Está seguro de que desea eliminar este documento?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: () => {
            dispatch(deleteDocument(documentsId));
            Alert.alert("Elemento eliminado.", "El documento ha sido marcado como eliminado.");
          }
        }
      ]
    );
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setString(text); // Copia el texto al portapapeles
    Alert.alert("Copiado", "La información se ha copiado al portapapeles.");
  };

  if (!namecontact || !documentNumber || !documentType) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DATOS DE CONTACTO...</Text>
      <Text style={styles.title1}>PARA {documentType} # {documentNumber}</Text>
      <TouchableOpacity onPress={handleViewPress} style={styles.button}>
        <Text style={styles.buttonText}>{namecontact}</Text>
        <Text style={styles.buttonText}>{documentType}</Text>
        <Text style={styles.buttonText}>{documentNumber}</Text>
      </TouchableOpacity>

      <View style={styles.containerboton}>
        <TouchableOpacity style={styles.iconButton} onPress={handleViewPress}>
          <Icon name="remove-red-eye" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleViewComent}>
          <FontAwesome name="whatsapp" size={40} color="black" /> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingButton} onPress={handleCollaboration}>
          <FontAwesomeIcon icon={faDollarSign} size={35} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingButton} onPress={handleDelete}>
          <FontAwesomeIcon icon={faTrash} size={30} color="black" /> 
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Colabora con Nosotros!</Text>
            <View style={styles.modalOption}>
              <Text style={styles.modalText}>Nequi: 3132315212</Text>
              <TouchableOpacity onPress={() => copyToClipboard("3132315212")} style={styles.copyButton}>
                <Icon name="content-copy" size={24} color="black" /> 
              </TouchableOpacity>
            </View>
            <View style={styles.modalOption}>
              <Text style={styles.modalText}>Daviplata: 3132315212</Text>
              <TouchableOpacity onPress={() => copyToClipboard("3132315212")} style={styles.copyButton}>
                <Icon name="content-copy" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalOption}>
              <Text style={styles.modalText}>Davivienda: 9999999999999</Text>
              <TouchableOpacity onPress={() => copyToClipboard("9999999999999")} style={styles.copyButton}>
                <Icon name="content-copy" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalOption}>
              <Text style={styles.modalText}>PayPal: gerardotelmex@gmail.com</Text>
              <TouchableOpacity onPress={() => copyToClipboard("gerardotelmex@gmail.com")} style={styles.copyButton}>
                <Icon name="content-copy" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default HomeVistaContactos;


