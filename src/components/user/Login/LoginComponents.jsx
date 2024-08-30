



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
  const [input, setInputs] = useState({
    email: "",
    password: "",
  });

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
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      HomeMain();
    } catch (error) {
      Alert.alert(
        "Error",
        "Por favor revisa el correo o la contraseña",
        [
          {
            text: "OK",
            style: "default",
            onPress: () => {},
          },
        ],
        {
          cancelable: false,
          titleStyle: {
            color: "red",
          },
          messageStyle: {
            color: "red",
          },
          containerStyle: {
            backgroundColor: "red",
          },
        }
      );
    }
  };

  return (
    <ImageBackground source={ImagenFondo} style={styles.backgroundImage}>
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
            <Text style={styles.errorText}>{emailError}</Text>
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
          </View>
          <Text onPress={RecoverPassword} style={styles.forgotPasswordText}>
            ¿Olvidaste tu Contraseña?{" "}
            <Text style={styles.recoverText}>Recupérala</Text>
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
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LoginComponents;

