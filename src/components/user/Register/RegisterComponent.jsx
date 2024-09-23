import React, { useState } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView, // Importa ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importa los íconos de FontAwesome
import styles from "./RegisterComponentStyle"; // Asegúrate de que la ruta sea correcta
import ImageLogin from "../../../../image/ImageLogin/ImageLogin.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig";
import ImagenFondo from "../../../../image/BackgroundImage/BackgroundImage.png";

const RegisterComponent = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    mensajeErrorPassword: "",
    mensajeErrorCamposVacios: "", // Añadido para manejar errores de campos vacíos
    mensajeErrorEmail: "", // Añadido para manejar errores de correo electrónico
    mensajeErrorPasswordLength: "", // Añadido para manejar errores de longitud de contraseña
  });

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });

    // Limpiar errores de campos vacíos cuando el usuario empieza a diligenciar
    if (value !== "") {
      setError((prevError) => ({
        ...prevError,
        mensajeErrorCamposVacios: "",
        mensajeErrorEmail: "",
        mensajeErrorPasswordLength: "",
      }));
    }

    // Limpiar errores de contraseñas si ya coinciden
    if (name === "password" || name === "passwordConfirm") {
      if (user.password === user.passwordConfirm) {
        setError((prevError) => ({
          ...prevError,
          mensajeErrorPassword: "",
        }));
      }
    }
  };

  const handleRegister = async () => {
    // Verifica si algún campo está vacío
    if (!user.email || !user.password || !user.passwordConfirm) {
      setError({
        ...error,
        mensajeErrorCamposVacios: "Todos los campos son obligatorios",
        mensajeErrorPassword: "", // Limpiar mensaje de error de contraseñas si hay
        mensajeErrorEmail: "", // Limpiar mensaje de error de correo electrónico si hay
        mensajeErrorPasswordLength: "", // Limpiar mensaje de error de longitud de contraseña si hay
      });
      return;
    }

    // Verifica si el email es válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError({
        ...error,
        mensajeErrorEmail: "El correo electrónico no es válido",
        mensajeErrorCamposVacios: "", // Limpiar mensaje de error de campos vacíos si hay
        mensajeErrorPassword: "", // Limpiar mensaje de error de contraseñas si hay
        mensajeErrorPasswordLength: "", // Limpiar mensaje de error de longitud de contraseña si hay
      });
      return;
    }

    // Verifica si la contraseña tiene al menos 6 caracteres
    if (user.password.length < 6) {
      setError({
        ...error,
        mensajeErrorPasswordLength: "La contraseña debe tener 6 caracteres",
        mensajeErrorCamposVacios: "", // Limpiar mensaje de error de campos vacíos si hay
        mensajeErrorPassword: "", // Limpiar mensaje de error de contraseñas si hay
        mensajeErrorEmail: "", // Limpiar mensaje de error de correo electrónico si hay
      });
      return;
    }

    // Verifica si las contraseñas coinciden
    if (user.password !== user.passwordConfirm) {
      setError({
        ...error,
        mensajeErrorPassword: "Las contraseñas no coinciden",
        mensajeErrorCamposVacios: "", // Limpiar mensaje de error de campos vacíos si hay
        mensajeErrorEmail: "", // Limpiar mensaje de error de correo electrónico si hay
        mensajeErrorPasswordLength: "", // Limpiar mensaje de error de longitud de contraseña si hay
      });
      return;
    }

    // Si no hay errores, procede con el registro
    try {
      // Realiza el registro del usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      alert("Usuario Registrado con éxito", userCredential.user);
      // Limpiar el estado después del registro exitoso
      setUser({
        email: "",
        password: "",
        passwordConfirm: "",
      });
      setError({
        mensajeErrorPassword: "",
        mensajeErrorCamposVacios: "",
        mensajeErrorEmail: "",
        mensajeErrorPasswordLength: "",
      });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError({
          ...error,
          mensajeErrorEmail: "El correo electrónico ya está en uso",
          mensajeErrorCamposVacios: "",
          mensajeErrorPassword: "",
        });
      } else {
        alert("Error al registrar usuario:", error.message);
      }
    }
  };

  return (
    <ImageBackground source={ImagenFondo} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image source={ImageLogin} style={styles.image} />

          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="envelope" size={20} color="#000" />
              <TextInput
                placeholder="Correo"
                keyboardType="email-address"
                style={styles.input}
                value={user.email}
                onChangeText={(text) => handleChange("email", text)}
              />
            </View>
          </View>

          {/* Mostrar errores de email */}
          {error.mensajeErrorEmail ? (
            <Text style={styles.errorText}>{error.mensajeErrorEmail}</Text>
          ) : null}

          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="lock" size={20} color="#000" />
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                value={user.password}
                onChangeText={(text) => handleChange("password", text)}
              />
            </View>
          </View>

          {/* Mostrar errores de longitud de contraseña */}
          {error.mensajeErrorPasswordLength ? (
            <Text style={styles.errorText}>{error.mensajeErrorPasswordLength}</Text>
          ) : null}

          <View style={styles.inputContainer}>
            <View style={styles.iconInputContainer}>
              <Icon name="lock" size={20} color="#000" />
              <TextInput
                placeholder="Confirmar Password"
                secureTextEntry={true}
                style={styles.input}
                value={user.passwordConfirm}
                onChangeText={(text) => handleChange("passwordConfirm", text)}
              />
            </View>
          </View>

          {/* Mostrar errores */}
          {error.mensajeErrorCamposVacios ? (
            <Text style={styles.errorText}>{error.mensajeErrorCamposVacios}</Text>
          ) : null}
          {error.mensajeErrorPassword ? (
            <Text style={styles.errorText}>{error.mensajeErrorPassword}</Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.textButton}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default RegisterComponent;

