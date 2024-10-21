import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { registerDocument } from "../../Redux/Actions";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./RegisterDocumentsComponentStyle";
import ImageLogin from "../../../image/ImageLogin/ImageLogin.png";
import ImagenFondo from "../../../image/BackgroundImage/BackgroundImage.png";
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'; 

const RegisterDocumentsComponent = () => {
  const navigation = useNavigation();

  

  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [foundOrLost, setFoundOrLost] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [otherUserId, setOtherUserId] = useState(""); 
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); 

  const dispatch = useDispatch(); 
  const auth = getAuth(); 
  const user = auth.currentUser; 
  const chatId = user ? user.uid : ""; 

  useEffect(() => {
    if (chatId) {
      setOtherUserId(chatId);
    }
  }, [chatId]); 

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
      !address ||
      !otherUserId
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
      fecha, 
      otherUserId,
      isDeleted: false // Inicializar como false mantiene el usuario activo"
    };

    dispatch(registerDocument(documentData, navigation));

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
                placeholder="Tipo Doc Ej: Pasaporte Dni, Cedula, o Placa"
                keyboardType="default"
                style={styles.input}
                value={documentType}
                onChangeText={(text) => setDocumentType(text.replace(/\s+/g, ''))}
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
                keyboardType="default"
                value={documentNumber}
                onChangeText={(text) => setDocumentNumber(text.replace(/\s+/g, ''))}
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
                keyboardType="default"
                style={styles.input}
                value={foundOrLost}
                onChangeText={(text) => setFoundOrLost(text.replace(/\s+/g, ''))}
              />
            </View>
          </View>

          {/* Nombre de Contacto */}
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="user" size={20} color="#000" />
              <TextInput
                keyboardType="default"
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
                onChangeText={(text) => setEmail(text.replace(/\s+/g, ''))}
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
                onChangeText={(text) => setPhoneNumber(text.replace(/\s+/g, ''))}
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
                keyboardType="default"
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
                keyboardType="default"
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
                keyboardType="default"
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

// import React, { useState, useEffect } from "react"; // Asegúrate de importar useEffect
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
// import { getAuth } from "firebase/auth"; // Importa getAuth

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
//   const [otherUserId, setOtherUserId] = useState(""); // Inicializa como cadena vacía
//   const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); // Estado para la fecha

//   const dispatch = useDispatch(); // Crear dispatch

//   const auth = getAuth(); // Obtén el objeto de autenticación
//   const user = auth.currentUser; // Obtén el usuario actual
//   const chatId = user ? user.uid : ""; // Asegúrate de que el usuario esté disponible antes de obtener su UID

//   useEffect(() => {
//     // Establece otherUserId solo una vez cuando el componente se monta
//     if (chatId) {
//       setOtherUserId(chatId);
//     }
//   }, [chatId]); // Dependencia en chatId

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
//       !address ||
//       !otherUserId
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
//       fecha, 
//       otherUserId // Asegúrate de que esto esté configurado correctamente
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
//                 placeholder="Tipo Doc Ej: Pasaporte Dni, Cedula, o Placa"
//                 keyboardType="default" // Cambiado a 'default'
//                 style={styles.input}
//                 value={documentType}
//                 onChangeText={(text) => setDocumentType(text.replace(/\s+/g, ''))} // Eliminar espacios
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
//                 keyboardType="default" // Cambiado a 'default'
//                 value={documentNumber}
//                 onChangeText={(text) => setDocumentNumber(text.replace(/\s+/g, ''))} // Eliminar espacios
//               />
//             </View>
//           </View>

//           {/* Encontre o Perdi */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="exclamation-triangle" size={20} color="#000" />
//               <TextInput
//                 autoCapitalize="characters"
//                 placeholder="Encontre o Perdi"
//                 keyboardType="default" // Cambiado a 'default'
//                 style={styles.input}
//                 value={foundOrLost}
//                 onChangeText={(text) => setFoundOrLost(text.replace(/\s+/g, ''))} // Eliminar espacios
//               />
//             </View>
//           </View>

//           {/* Nombre de Contacto */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="user" size={20} color="#000" />
//               <TextInput
//                 keyboardType="default" // Cambiado a 'default'
//                 autoCapitalize="characters"
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
//                 autoCapitalize="characters"
//                 placeholder="Correo Electrónico"
//                 keyboardType="email-address"
//                 style={styles.input}
//                 value={email}
//                 onChangeText={(text) => setEmail(text.replace(/\s+/g, ''))} // Eliminar espacios
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
//                 onChangeText={(text) => setPhoneNumber(text.replace(/\s+/g, ''))} // Eliminar espacios
//               />
//             </View>
//           </View>

//           {/* País */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="globe" size={20} color="#000" />
//               <TextInput
//                 autoCapitalize="characters"
//                 placeholder="País"
//                 keyboardType="default" // Cambiado a 'default'
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
//                 autoCapitalize="characters"
//                 placeholder="Ciudad"
//                 style={styles.input}
//                 value={city}
//                 onChangeText={setCity}
//                 keyboardType="default" // Cambiado a 'default'
//               />
//             </View>
//           </View>

//           {/* Dirección */}
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <Icon name="map-marker" size={20} color="#000" />
//               <TextInput
//                 autoCapitalize="characters"
//                 placeholder="Dirección"
//                 keyboardType="default" // Cambiado a 'default'
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
