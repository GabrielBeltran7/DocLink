import React, { useEffect } from 'react';
import { View, BackHandler, Alert } from 'react-native';
import HomeNanvar from '../HomeNanvar/HomeNanvar';
import HomeVistaContactos from '../HomeVistaContacto/HomeVistaContactos';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../../api/firebase/FirebaseConfig/FirebaseConfig'; // Asegúrate de que la ruta sea correcta
import { signOut } from 'firebase/auth';

const HomeComponentsMain = () => {
  const navigation = useNavigation(); // Para navegar

  useEffect(() => {
    const backAction = () => {
      // Preguntar si el usuario desea desloguearse
      Alert.alert(
        "Cerrar sesión",
        "¿Deseas desloguearte?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Desloguearse",
            onPress: async () => {
              try {
                await signOut(auth); // Desloguear al usuario
                navigation.navigate("LoginUser"); // Navegar a la pantalla de inicio de sesión
              } catch (error) {
                console.error("Error al cerrar sesión: ", error);
                Alert.alert("Error", "Ocurrió un error al cerrar sesión.");
              }
            },
          },
        ],
        { cancelable: false }
      );
      return true; // Retornar true para evitar que se navegue hacia atrás
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Limpiar el evento al desmontar el componente
  }, [navigation]);

  return (
    <View>
      <HomeNanvar />
      <HomeVistaContactos />
    </View>
  );
};

export default HomeComponentsMain;
