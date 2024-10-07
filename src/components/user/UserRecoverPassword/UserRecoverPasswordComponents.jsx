import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ImageLogin from "../../../../image/ImageLogin/ImageLogin.png";
import styles from "./UserRecoverPasswordComponentsStyle";
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig";
import ImagenFondo from "../../../../image/BackgroundImage/BackgroundImage.png";

export const UserRecoverPasswordComponents = () => {
  const [input, setInputs] = useState({
    email: "",
  });

  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (name, value) => {
    setInputs({
      ...input,
      [name]: value,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handlePasswordRecover = async () => {
    setEmailError("");
    if (!isEmailValid(input.email)) {
      setEmailError("Ingresa un correo electrónico válido");
      return;
    }

    setLoading(true); // Iniciar la carga

    try {
      // Verificar si el correo está registrado
      const signInMethods = await fetchSignInMethodsForEmail(auth, input.email);
      
      if (signInMethods.length === 0) {
        setEmailError("El correo no está registrado.");
        setLoading(false); // Terminar la carga
        return;
      }

      // Enviar el correo de recuperación si está registrado
      await sendPasswordResetEmail(auth, input.email);
      alert("Correo enviado con éxito. Revisa tu bandeja de entrada.");
      setInputs({
        email:""
      });
    } catch (error) {
      // Manejar errores específicos
      if (error.code === 'auth/user-not-found') {
        setEmailError("No se encontró una cuenta con este correo.");
      } else if (error.code === 'auth/invalid-email') {
        setEmailError("Correo electrónico no válido.");
      } else {
        setEmailError("Error al enviar el correo. Inténtalo de nuevo más tarde.");
      }
    } finally {
      setLoading(false); // Terminar la carga
    }
  };

  return (
    <ImageBackground source={ImagenFondo} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.scrollViewContent}>
          <View style={styles.container}>
            <Image source={ImageLogin} style={styles.image} />
            <View style={styles.inputContainer}>
              <View style={styles.iconInputContainer}>
                <View style={styles.tamaño}>
                  <FontAwesomeIcon icon={faEnvelope} style={styles.inputIcon} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={input.email}
                  onChangeText={(text) => handleChangeInput("email", text)}
                  editable={!loading} // Desactivar el input durante la carga
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
            <TouchableOpacity
              onPress={handlePasswordRecover}
              style={styles.button}
              disabled={loading} // Desactivar el botón durante la carga
            >
              <Text style={styles.textButton}>
                {loading ? "Enviando..." : "Recuperar Contraseña"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
