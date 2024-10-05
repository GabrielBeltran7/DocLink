import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome'; // Para agregar iconos
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import styles from "./HomeVistaContactosStyle";
import { getAuth } from "firebase/auth"; // Importa getAuth

function HomeVistaContactos() {
  const navigation = useNavigation(); // Inicializa el objeto de navegación
  const documentState = useSelector((state) => state.documentidData) || {}; // Asegúrate de que documentState sea un objeto
  
  const namecontact = documentState.contactName; 
  const documentNumber = documentState.documentNumber; 
  const documentType = documentState.documentType;

  const handleViewPress = () => {
    navigation.navigate('UpdateComponentsDocuments'); // Navega al componente deseado
  };

  const auth = getAuth(); // Obtén el objeto de autenticación
  
  const handleViewComent = () => {
    navigation.navigate("HomeComponentChat", {
      documentNumber: documentNumber, 
      documentType: documentType
    });
  };

 

  // Comprobar si hay datos de contacto
  if (!namecontact || !documentNumber || !documentType) {
    return null; // No muestra nada si no hay datos
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos de Contacto</Text>
      <TouchableOpacity onPress={handleViewPress} style={styles.button}>
        <Text style={styles.buttonText}>{namecontact}</Text>
        <Text style={styles.buttonText}>{documentType}</Text>
        <Text style={styles.buttonText}>{documentNumber}</Text>
      </TouchableOpacity>

      <View style={styles.containerboton}>
        <TouchableOpacity style={styles.iconButton} onPress={handleViewPress}>
          <Icon name="eye" size={50} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleViewComent}>
          <Icon name="whatsapp" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeVistaContactos;
