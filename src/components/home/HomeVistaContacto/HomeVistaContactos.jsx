import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome'; // Para agregar iconos
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import styles from "./HomeVistaContactosStyle";
import { getAuth } from "firebase/auth"; // Importa getAuth

function HomeVistaContactos() {
  const navigation = useNavigation(); // Inicializa el objeto de navegación
  const documentState = useSelector((state) => state.documentidData);
  const namecontact = documentState.contactName; // No es necesario stringify aquí
  const documentNumber = documentState.documentNumber; // No es necesario stringify aquí
  const documentType = documentState.documentType;
const otherUserId = documentState.otherUserId
 
  const handleViewPress = () => {
    navigation.navigate('UpdateComponentsDocuments'); // Navega al componente deseado
  };
 
  const auth = getAuth(); // Obtén el objeto de autenticación
  const user = auth.currentUser; // Obtén el usuario actual
  
  const handleViewComent = () => {
    navigation.navigate("HomeComponentChat", {
      documentNumber: documentNumber, 
    });
  }
  console.log("DOCUMENTS NUMBERS", documentNumber)


    return (
    <View style={styles.container}>
      
      
      {namecontact ? (
        <>
        <Text style={styles.title}>Datos de Contacto</Text>
          <TouchableOpacity  onPress={handleViewPress} style={styles.button}>
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
        </>
      ) : (
        <Text style={styles.notFoundText}></Text>
      )}
    </View>
  );
}

export default HomeVistaContactos;
