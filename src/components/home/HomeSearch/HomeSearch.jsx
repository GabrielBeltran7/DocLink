import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './HomeSearchStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Importa useDispatch para enviar acciones
import { searchDocument } from '../../../Redux/Actions';

const HomeSearch = () => {
  const [documentNumber, setDocumentNumber] = useState(""); // Estado para el número de documento

  const dispatch = useDispatch(); // Obtén la función dispatch

  const handleSearch = () => {
    const trimmedDocumentNumber = documentNumber.trim(); // Elimina espacios en blanco

    if (!trimmedDocumentNumber) {
      Alert.alert("Error", "Por favor, ingresa un número de documento o placa.");
      return;
    }

    // Despacha la acción para buscar el documento
    dispatch(searchDocument(trimmedDocumentNumber));
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        autoCapitalize='characters'
        placeholder="Digite # Documento o Placa"
        style={styles.searchInput}
        placeholderTextColor="black" // Mejora la visibilidad del placeholder
        value={documentNumber} // Asigna el valor del estado
        onChangeText={(text) => setDocumentNumber(text.replace(/\s+/g, ''))} // Reemplaza espacios en blanco
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text>
          <Icon name="search" size={20} color="#fff" /> 
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeSearch;

