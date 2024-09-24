import React, { useState, useEffect } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert, // Añadido para mostrar alertas de error
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./RegisterDocumentsComponentStyle";
import ImageLogin from "../../../image/ImageLogin/ImageLogin.png";
import ImagenFondo from "../../../image/BackgroundImage/BackgroundImage.png";

const RegisterDocumentsComponent = () => {
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [foundOrLost, setFoundOrLost] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState(""); // Ahora editable
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = () => {
    // Validación de campos vacíos
    if (!documentType || !documentNumber || !foundOrLost || !contactName || !email || !phoneNumber || !country || !city || !address) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, introduce un correo electrónico válido.");
      return;
    }

    console.log({
      documentType,
      documentNumber,
      foundOrLost,
      contactName,
      email,
      phoneNumber,
      country,
      city,
      address,
    });
    
    // Limpiar los campos después de un registro exitoso
    setDocumentType("");
    setDocumentNumber("");
    setFoundOrLost("");
    setContactName("");
    setEmail("");
    setPhoneNumber("");
    setCountry(""); 
    setCity("");
    setAddress("");
  };

  

  return (
    <ImageBackground source={ImagenFondo} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>

          {/* Tipo de Documento */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="id-card" size={20} color="#000" />
              <TextInput
               autoCapitalize="characters"
                placeholder="Tipo de Documento o Placa"
                style={styles.input}
                value={documentType}
                onChangeText={setDocumentType}
              />
            </View>
          </View>

          {/* Número de Documento */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="id-card-o" size={20} color="#000" />
              <TextInput
                placeholder="Número de Documento o Placa"
                style={styles.input}
                autoCapitalize="characters"
                value={documentNumber}
                onChangeText={setDocumentNumber}
              />
            </View>
          </View>

          {/* Encontre o Perdi */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="exclamation-triangle" size={20} color="#000" />
              <TextInput
                placeholder="Encontre o Perdi"
                 autoCapitalize="characters"
                style={styles.input}
                keyboardType="default"
                value={foundOrLost}
                onChangeText={setFoundOrLost}
              />
            </View>
          </View>

          {/* Nombre de Contacto */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="user" size={20} color="#000" />
              <TextInput
                placeholder="Nombre de Contacto"
                 autoCapitalize="characters"
                style={styles.input}
                value={contactName}
                onChangeText={setContactName}
              />
            </View>
          </View>

          {/* Correo Electrónico */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="envelope" size={20} color="#000" />
              <TextInput
                placeholder="Correo Electrónico"
                 autoCapitalize="characters"
                keyboardType="email-address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Número de Teléfono */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="phone" size={20} color="#000" />
              <TextInput
                placeholder="Número de Teléfono"
                keyboardType="phone-pad"
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber} // Corregido aquí
              />
            </View>
          </View>

          {/* País */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="globe" size={20} color="#000" />
              <TextInput
                placeholder="País"
                 autoCapitalize="characters"
                style={styles.input}
                value={country} // Ahora editable
                onChangeText={setCountry} // Añadido para actualizar el estado
              />
            </View>
          </View>

          {/* Ciudad */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="building" size={20} color="#000" />
              <TextInput
                placeholder="Ciudad"
                style={styles.input}
                value={city}
                onChangeText={setCity}
                 autoCapitalize="characters"
              />
            </View>
          </View>

          {/* Dirección */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="map-marker" size={20} color="#000" />
              <TextInput
               autoCapitalize="characters"
                placeholder="Dirección"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.textButton}>Registrar Documento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default RegisterDocumentsComponent;
