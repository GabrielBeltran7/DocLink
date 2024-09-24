import React, { useState } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux"; // Importar useDispatch
import { registerDocument } from "../../Redux/Actions"; // Importar la acción
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
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); // Estado para la fecha

  const dispatch = useDispatch(); // Crear dispatch

  const handleRegister = () => {
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

    // Despachar la acción al store de Redux
    const documentData = {
      documentType,
      documentNumber,
      foundOrLost,
      contactName,
      email,
      phoneNumber,
      country,
      city,
      address,
      fecha, // Añadir la fecha al objeto de datos
    };

    dispatch(registerDocument(documentData));

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
                keyboardType="email-address"
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
                keyboardType="email-address"
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
                autoCapitalize="characters"
                placeholder="Encontre o Perdi"
                keyboardType="email-address"
                style={styles.input}
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
              keyboardType="email-address"
                autoCapitalize="characters"
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
                autoCapitalize="characters"
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
              />
            </View>
          </View>

          {/* País */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="globe" size={20} color="#000" />
              <TextInput
                autoCapitalize="characters"
                placeholder="País"
                keyboardType="email-address"
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
                keyboardType="email-address"
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
                keyboardType="email-address"
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

// import React, { useState } from "react";
// import {
//   Image,
//   TextInput,
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { useDispatch } from "react-redux"; // Importar useDispatch
// import { registerDocument } from "../../Redux/Actions"; // Importar la acción
// import Icon from "react-native-vector-icons/FontAwesome";
// import styles from "./RegisterDocumentsComponentStyle";
// import ImageLogin from "../../../image/ImageLogin/ImageLogin.png";
// import ImagenFondo from "../../../image/BackgroundImage/BackgroundImage.png";

// const RegisterDocumentsComponent = () => {
//   const [documentType, setDocumentType] = useState("");
//   const [documentNumber, setDocumentNumber] = useState("");
//   const [foundOrLost, setFoundOrLost] = useState("");
//   const [contactName, setContactName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [country, setCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [address, setAddress] = useState("");

//   const dispatch = useDispatch(); // Crear dispatch

//   const handleRegister = () => {
//     // Validación de campos vacíos
//     if (
//       !documentType ||
//       !documentNumber ||
//       !foundOrLost ||
//       !contactName ||
//       !email ||
//       !phoneNumber ||
//       !country ||
//       !city ||
//       !address
//     ) {
//       Alert.alert("Error", "Todos los campos son obligatorios.");
//       return;
//     }

//     // Validación de correo electrónico
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       Alert.alert("Error", "Por favor, introduce un correo electrónico válido.");
//       return;
//     }

//     // Despachar la acción al store de Redux
//     const documentData = {
//       documentType,
//       documentNumber,
//       foundOrLost,
//       contactName,
//       email,
//       phoneNumber,
//       country,
//       city,
//       address,
//     };

//     dispatch(registerDocument(documentData));

//     // Limpiar los campos después de un registro exitoso
//     setDocumentType("");
//     setDocumentNumber("");
//     setFoundOrLost("");
//     setContactName("");
//     setEmail("");
//     setPhoneNumber("");
//     setCountry("");
//     setCity("");
//     setAddress("");
//   };

//   return (
//     <ImageBackground source={ImagenFondo} style={styles.backgroundImage}>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.container}>
//           {/* Tipo de Documento */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="id-card" size={20} color="#000" />
//               <TextInput
//                 autoCapitalize="characters"
//                 placeholder="Tipo de Documento o Placa"
//                 style={styles.input}
//                 value={documentType}
//                 onChangeText={setDocumentType}
//               />
//             </View>
//           </View>

//           {/* Número de Documento */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="id-card-o" size={20} color="#000" />
//               <TextInput
//                 placeholder="Número de Documento o Placa"
//                 style={styles.input}
//                 autoCapitalize="characters"
//                 value={documentNumber}
//                 onChangeText={setDocumentNumber}
//               />
//             </View>
//           </View>

//         {/* Encontre o Perdi */}
//         <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="exclamation-triangle" size={20} color="#000" />
//               <TextInput
//               autoCapitalize="characters"
//                 placeholder="Encontre o Perdi"
//                 style={styles.input}
//                 value={foundOrLost}
//                 onChangeText={setFoundOrLost}
//               />
//             </View>
//           </View>

//           {/* Nombre de Contacto */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="user" size={20} color="#000" />
//               <TextInput
//               autoCapitalize="characters"
//                 placeholder="Nombre de Contacto"
//                 style={styles.input}
//                 value={contactName}
//                 onChangeText={setContactName}
//               />
//             </View>
//           </View>

//           {/* Correo Electrónico */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="envelope" size={20} color="#000" />
//               <TextInput
//               autoCapitalize="characters"
//                 placeholder="Correo Electrónico"
//                 keyboardType="email-address"
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//               />
//             </View>
//           </View>

//           {/* Número de Teléfono */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="phone" size={20} color="#000" />
//               <TextInput
//                 placeholder="Número de Teléfono"
//                 keyboardType="phone-pad"
//                 style={styles.input}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//               />
//             </View>
//           </View>

//           {/* País */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="globe" size={20} color="#000" />
//               <TextInput
//               autoCapitalize="characters"
//                 placeholder="País"
//                 style={styles.input}
//                 value={country}
//                 onChangeText={setCountry}
//               />
//             </View>
//           </View>

//           {/* Ciudad */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="building" size={20} color="#000" />
//               <TextInput
//               autoCapitalize="characters"
//                 placeholder="Ciudad"
//                 style={styles.input}
//                 value={city}
//                 onChangeText={setCity}
//               />
//             </View>
//           </View>

//           {/* Dirección */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="map-marker" size={20} color="#000" />
//               <TextInput
//               autoCapitalize="characters"
//                 placeholder="Dirección"
//                 style={styles.input}
//                 value={address}
//                 onChangeText={setAddress}
//               />
//             </View>
//           </View>


//           <TouchableOpacity style={styles.button} onPress={handleRegister}>
//             <Text style={styles.textButton}>Registrar Documento</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// export default RegisterDocumentsComponent;

