import React, { useState } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./RegisterDocumentsComponentStyle";
import ImageLogin from "../../../image/ImageLogin/ImageLogin.png";
import ImagenFondo from "../../../image/BackgroundImage/BackgroundImage.png";
import RNPickerSelect from "react-native-picker-select";
const RegisterDocumentsComponent = () => {
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [foundOrLost, setFoundOrLost] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = () => {
    // Aquí puedes agregar la lógica de validación y registro como se requiere.
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
          <Image source={ImageLogin} style={styles.image} />

          {/* Tipo de Documento */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="id-card" size={20} color="#000" />
              <TextInput
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
                placeholder="Número de Documento"
                style={styles.input}
                keyboardType="numeric"
                value={documentNumber}
                onChangeText={setDocumentNumber}
              />
            </View>
          </View>

     {/* Número de Documento */}
     <View style={styles.inputContainer}>
  <View style={styles.iconInputContainer}>
    <Icon name="exclamation-triangle" size={20} color="#000" />
    <TextInput
      placeholder="Encontre o Perdi"
      style={styles.input}
      keyboardType="default"
      value={foundOrLost}
      onChangeText={setFoundOrLost}
    />
  </View>
</View>



          {/* Selección de Deporte */}
          {/* <View style={styles.inputContainer}>
             <Text style={styles.input}>Seleccione una Opccion:</Text> 
            <RNPickerSelect
              onValueChange={(value) => setDocumentType(value)}
              placeholder={{
                label: "Seleccione una opción",
                value: null,
                color: "#999",
              }}
              items={[
                { label: "Encontré", value: "Encontre" },
                { label: "Perdí", value: "Perdi" },
              ]}
              style={styles.pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>
           */}

          {/* Nombre de Contacto */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="user" size={20} color="#000" />
              <TextInput
                placeholder="Nombre de Contacto"
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
                onChangeText={setPhoneNumber}
                onEndEditing={() => {
                  // Aquí puedes agregar lógica para detectar el país por el indicativo
                  console.log("Detectar país por indicativo");
                }}
              />
            </View>
          </View>

          {/* País */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="globe" size={20} color="#000" />
              <TextInput
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
