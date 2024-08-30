import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './HomeSearchStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeSearch = () => {

  return (
    <View style={styles.searchContainer}>
      
      <TextInput
        placeholder="Digite # Documento o Placa"
        style={styles.searchInput}
        placeholderTextColor="black" // Mejora la visibilidad del placeholder
      />
      <TouchableOpacity style={styles.searchButton}>
        <Text>
        <Icon name="search" size={20} color="#fff" /> 
        </Text>
      </TouchableOpacity>
    </View>
  );
}



export default HomeSearch;

