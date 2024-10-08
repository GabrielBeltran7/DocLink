import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateDocument } from "../../Redux/Actions";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./UpdateComponentsDocumentsStyle";
import ImagenFondo from "../../../image/BackgroundImage/BackgroundImage.png";
import Communications from 'react-native-communications';

const UpdateComponentsDocuments = () => {
  const documentState = useSelector((state) => state.documentidData);
  const dispatch = useDispatch();

  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [foundOrLost, setFoundOrLost] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (documentState) {
      setDocumentType(documentState.documentType);
      setDocumentNumber(documentState.documentNumber);
      setFoundOrLost(documentState.foundOrLost);
      setContactName(documentState.contactName);
      setEmail(documentState.email);
      setPhoneNumber(documentState.phoneNumber);
      setCountry(documentState.country);
      setCity(documentState.city);
      setAddress(documentState.address);
    }
  }, [documentState]);

  const handleUpdate = () => {
    // Validación de campos vacíos
    if (
      !documentType ||
      !documentNumber ||
      !foundOrLost ||
      !contactName ||
      !email ||
      !phoneNumber ||
      !country ||
      !city ||
      !address
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, introduce un correo electrónico válido.");
      return;
    }

    // Despachar la acción al store de Redux para actualizar
    const documentData = {
      id: documentState.id,
      documentType,
      documentNumber,
      foundOrLost,
      contactName,
      email,
      phoneNumber,
      country,
      city,
      address,
    };

   
    dispatch(updateDocument(documentData));

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

  // Función para realizar la llamada
  const handleCall = () => {
    Communications.phonecall(phoneNumber, true); // true para marcar automáticamente
  };

  // Función para enviar correo
  const handleEmail = () => {
    Communications.email([email], null, null, "Asunto del Correo", "Cuerpo del Correo");
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
                placeholder="Tipo Doc Ej: Pasaporte Dni, Cedula, o Placa"
                style={styles.input}
                value={documentType}
                onChangeText={(text) => setDocumentType(text.trim())} // Quitar espacios
                keyboardType="email-address"
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
                onChangeText={(text) => setDocumentNumber(text.trim())} // Quitar espacios
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Encontre o Perdi */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="exclamation-triangle" size={20} color="#000" />
              <TextInput
                autoCapitalize="characters"
                placeholder="Encontre o Perdi"
                style={styles.input}
                value={foundOrLost}
                onChangeText={(text) => setFoundOrLost(text.trim())} // Quitar espacios
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Nombre de Contacto */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="user" size={20} color="#000" />
              <TextInput
                autoCapitalize="characters"
                placeholder="Nombre de Contacto"
                style={styles.input}
                value={contactName}
                onChangeText={setContactName}
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Correo Electrónico */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="envelope" size={20} color="#000" />
              <TextInput
                autoCapitalize="characters"
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text.trim())} // Quitar espacios
              />
              <TouchableOpacity onPress={handleEmail}>
                <Icon name="envelope" size={20} color="green" />
              </TouchableOpacity>
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
                onChangeText={(text) => setPhoneNumber(text.trim())} // Quitar espacios
              />
              <TouchableOpacity onPress={handleCall}>
                <Icon name="phone" size={20} color="green" />
              </TouchableOpacity>
            </View>
          </View>

          {/* País */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="globe" size={20} color="#000" />
              <TextInput
                keyboardType="email-address"
                autoCapitalize="characters"
                placeholder="País"
                style={styles.input}
                value={country}
                onChangeText={setCountry}
              />
            </View>
          </View>

          {/* Ciudad */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="building" size={20} color="#000" />
              <TextInput
                autoCapitalize="characters"
                placeholder="Ciudad"
                style={styles.input}
                value={city}
                onChangeText={setCity}
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

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.textButton}>Actualizar Documento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default UpdateComponentsDocuments;
