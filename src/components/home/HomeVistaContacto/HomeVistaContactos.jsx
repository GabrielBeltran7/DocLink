import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome'; // Para agregar iconos
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import styles from "./HomeVistaContactosStyle";

function HomeVistaContactos() {
  const navigation = useNavigation(); // Inicializa el objeto de navegación
  const documentState = useSelector((state) => state.documentidData);
  const namecontact = documentState.contactName; // No es necesario stringify aquí
  const documentNumber = documentState.documentNumber; // No es necesario stringify aquí
  const documentType = documentState.documentType;

  console.log("numero de telefono funciona", documentState)
  const handleViewPress = () => {
    navigation.navigate('UpdateComponentsDocuments'); // Navega al componente deseado
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos de Contacto</Text>
      
      {namecontact ? (
        <>
          <TouchableOpacity  onPress={handleViewPress} style={styles.button}>
            <Text style={styles.buttonText}>{namecontact}</Text>
            <Text style={styles.buttonText}>{documentType}</Text>
            <Text style={styles.buttonText}>{documentNumber}</Text>
          </TouchableOpacity>

          <View style={styles.containerboton}>
            <TouchableOpacity style={styles.iconButton} onPress={handleViewPress}>
              <Icon name="eye" size={50} color="#3399FF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Icon name="comment" size={50} color="#3399FF" />
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




