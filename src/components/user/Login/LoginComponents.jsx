import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  Linking, // Importa Linking
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import ImageLogin from "../../../../image/ImageLogin/ImageLogin.png";
import ImagenFondo from "../../../../image/BackgroundImage/BackgroundImage.png";
import styles from "./LoginComponentsStyle";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

const LoginComponents = () => {
  const navigation = useNavigation();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [input, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (name, value) => {
    setInputs({
      ...input,
      [name]: value,
    });

    if (name === "email" && emailError) {
      setEmailError("");
    }

    if (name === "password" && passwordError) {
      setPasswordError("");
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const HomeMain = () => {
    navigation.navigate("HomeMain");
  };

  const RecoverPassword = () => {
    navigation.navigate("UserRecoverPassword");
  };

  const handleSignIn = async () => {
    if (!isEmailValid(input.email)) {
      setEmailError("Ingresa un correo válido");
      return;
    }

    if (input.password.trim() === "") {
      setPasswordError("Ingresa una contraseña");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
      HomeMain();
      setInputs({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Error de inicio de sesión:", error);

      if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "El correo electrónico proporcionado no es inválido.");
      } else if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "El correo electrónico no está registrado o esta mal escrito.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "La contraseña es incorrecta.");
      } else if (error.code === "auth/too-many-requests") {
        Alert.alert(
          "Error",
          "El acceso a esta cuenta ha sido temporalmente deshabilitado debido a demasiados intentos de inicio de sesión. Puedes restablecer tu contraseña para restaurar el acceso."
        );
      } else {
        Alert.alert("Error", "Ocurrió un error inesperado. Por favor intenta nuevamente.");
      }
    }
  };

  const openHelpVideo = () => {
    Linking.openURL('https://www.youtube.com/watch?v=l04MA5HpMZw'); // Reemplaza con la URL del video
  };

  return (
    <ImageBackground source={ImagenFondo} style={styles.backgroundImage}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image source={ImageLogin} style={styles.image} />
          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <FontAwesomeIcon icon={faEnvelope} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={input.email}
                onChangeText={(text) => handleChangeInput("email", text)}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <View style={styles.iconInputContainer}>
              <FontAwesomeIcon icon={faLock} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={input.password}
                onChangeText={(text) => handleChangeInput("password", text)}
              />
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>
          <Text onPress={RecoverPassword} style={styles.forgotPasswordText}>
            ¿Olvidaste tu Contraseña?{" "}
            <Text style={styles.recoverText}>Recupérala</Text>
          </Text>
          <Text onPress={openHelpVideo} style={styles.forgotPasswordText}>
            ¿Necesitas ayuda? Ingresa{" "}
            <Text style={styles.recoverText}>Aquí</Text>
          </Text>

          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={styles.textButton}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("RegisterUser")}
          >
            <Text style={styles.textButton}>Crear Cuenta</Text>
          </TouchableOpacity>
          {/* <View>  
            <Admobcomponents/>
          </View> */}
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

export default LoginComponents;

// import React, { useState } from "react";
// import {
//   View,
//   Image,
//   TextInput,
//   ImageBackground,
//   Text,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   StatusBar // Importar StatusBar
// } from "react-native";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
// import ImageLogin from "../../../../image/ImageLogin/ImageLogin.png";
// import ImagenFondo from "../../../../image/BackgroundImage/BackgroundImage.png";
// import styles from "./LoginComponentsStyle";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig";
// import { useNavigation } from "@react-navigation/native";

// const LoginComponents = () => {
//   const navigation = useNavigation();
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [input, setInputs] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChangeInput = (name, value) => {
//     setInputs({
//       ...input,
//       [name]: value,
//     });

//     if (name === "email" && emailError) {
//       setEmailError("");
//     }

//     if (name === "password" && passwordError) {
//       setPasswordError("");
//     }
//   };

//   const isEmailValid = (email) => {
//     const emailRegex = /\S+@\S+\.\S+/;
//     return emailRegex.test(email);
//   };

//   const HomeMain = () => {
//     navigation.navigate("HomeMain");
//   };

//   const RecoverPassword = () => {
//     navigation.navigate("UserRecoverPassword");
//   };

//   const handleSignIn = async () => {
//     if (!isEmailValid(input.email)) {
//       setEmailError("Ingresa un correo válido");
//       return;
//     }

//     if (input.password.trim() === "") {
//       setPasswordError("Ingresa una contraseña");
//       return;
//     }

//     try {
//       await signInWithEmailAndPassword(auth, input.email, input.password);
//       HomeMain();
//       setInputs({
//         email: "",
//         password: "",
//       });
//     } catch (error) {
//       console.log("Error de inicio de sesión:", error);

//       if (error.code === "auth/invalid-email") {
//         Alert.alert("Error", "El correo electrónico proporcionado es inválido.");
//       } else if (error.code === "auth/user-not-found") {
//         Alert.alert("Error", "El correo electrónico no está registrado o esta mal escrito.");
//       } else if (error.code === "auth/wrong-password") {
//         Alert.alert("Error", "La contraseña es incorrecta.");
//       } else if (error.code === "auth/too-many-requests") {
//         Alert.alert(
//           "Error",
//           "El acceso a esta cuenta ha sido temporalmente deshabilitado debido a demasiados intentos de inicio de sesión. Puedes restablecer tu contraseña para restaurar el acceso."
//         );
//       } else {
//         Alert.alert("Error", "Ocurrió un error inesperado. Por favor intenta nuevamente.");
//       }
//     }
//   };

//   return (
//     <ImageBackground source={ImagenFondo} style={styles.backgroundImage}>
//       {/* Agregar el componente StatusBar para cambiar el color */}
//       <StatusBar
//         barStyle="light-content"  // Íconos claros (para fondos oscuros)
//         backgroundColor="black" // Color de fondo de la barra de estado (solo Android)
//       />
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.container}>
//           <Image source={ImageLogin} style={styles.image} />
//           <View style={styles.inputContainer}>
//             <View style={styles.iconInputContainer}>
//               <FontAwesomeIcon icon={faEnvelope} style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 keyboardType="email-address"
//                 value={input.email}
//                 onChangeText={(text) => handleChangeInput("email", text)}
//               />
//             </View>
//             {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
//             <View style={styles.iconInputContainer}>
//               <FontAwesomeIcon icon={faLock} style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry={true}
//                 value={input.password}
//                 onChangeText={(text) => handleChangeInput("password", text)}
//               />
//             </View>
//             {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
//           </View>
//           <Text onPress={RecoverPassword} style={styles.forgotPasswordText}>
//             ¿Olvidaste tu Contraseña?{" "}
//             <Text style={styles.recoverText}>Recupérala</Text>
//           </Text>
//           <Text onPress={RecoverPassword} style={styles.forgotPasswordText}>
//           "¿Necesitas ayuda? Ingresa{" "}
//             <Text style={styles.recoverText}>Aqui"</Text>
//           </Text>

//           <TouchableOpacity onPress={handleSignIn} style={styles.button}>
//             <Text style={styles.textButton}>Iniciar Sesión</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate("RegisterUser")}
//           >
//             <Text style={styles.textButton}>Crear Cuenta</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// export default LoginComponents;





