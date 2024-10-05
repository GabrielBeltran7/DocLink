
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
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig";
import ImagenFondo from "../../../../image/BackgroundImage/BackgroundImage.png";

export const UserRecoverPasswordComponents = () => {
  const [input, setInputs] = useState({
    email: "",
  });

  const [emailError, setEmailError] = useState("");

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

    try {
      await sendPasswordResetEmail(auth, input.email);
      alert("Correo enviado con éxito.");
    } catch (error) {
      alert("Error al enviar el correo, revisa que esté bien.");
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
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
            <TouchableOpacity
              onPress={handlePasswordRecover}
              style={styles.button}
            >
              <Text style={styles.textButton}>Recuperar Contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
