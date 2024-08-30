import React, { useState } from "react";
import { Image, TextInput, View, Text, TouchableOpacity } from "react-native";
import style from "./RegisterComponentStyle";
import ImageLogin from "../../../../image/ImageLogin/ImageLogin.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useDispatch } from "react-redux";
import { postUser } from "../../../Redux/Actions";

const RegisterComponent = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",

  });

  const [customerUser, setCustomerUser] = useState({
    name: "",
    email: "",
    phone: "",
   
  });

  const [error, setError] = useState({
    mensajeErrorNombre: "",
    mensajeErrorEmail: "",
    mensajeErrorPassword: "",
  });

  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });

    setCustomerUser({
      ...customerUser,
      name: value,
      email: value,
      phone: value,
     
    });
  };

  const handleRegister = async () => {
    try {
      // Verifica si las contraseñas coinciden
      if (user.password !== user.passwordConfirm) {
        setError({
          ...error,
          mensajeErrorPassword: "Las contraseñas no coinciden",
        });
        return;
      }

      // Realiza el registro del usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const registeredUser = userCredential.user;
      // console.log("Usuario registrado:", registeredUser);
      if (registeredUser) {
        dispatch(postUser(customerUser));
      }
      // Realiza acciones adicionales después de registrar al usuario, si es necesario
    } catch (error) {
      console.log(error);
      alert("Error al registrar usuario:", error);
    }
  };

  return (
    <View style={style.outerContainer}>
      <View style={style.container}>
        <Image source={ImageLogin} style={style.image} />
        <TextInput
          onChangeText={(text) => handleChange("name", text)}
          placeholder="Nombre"
          style={style.input}
        />
        <TextInput
          placeholder="Correo"
          keyboardType="email-address"
          style={style.input}
          value={user.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          name="telefono"
          onChangeText={(text) => handleChange("phone", text)}
          keyboardType="numeric"
          placeholder="Teléfono"
          style={style.input}
        />
        <TextInput
          placeholder="RUC"
          style={style.input}
          onChangeText={(text) => handleChange("RUC", text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={style.input}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TextInput
          placeholder="Confirmar Password"
          secureTextEntry={true}
          style={style.input}
          onChangeText={(text) => handleChange("passwordConfirm", text)}
        />
        <Text style={style.errorText}>{error.mensajeErrorPassword}</Text>
        <TouchableOpacity style={style.button} onPress={handleRegister}>
          <Text style={style.textbutton}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterComponent;
