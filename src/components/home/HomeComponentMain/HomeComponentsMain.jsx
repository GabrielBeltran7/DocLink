import React, { useEffect } from 'react';
import { View, BackHandler, Alert, TouchableOpacity  } from 'react-native';
import HomeNanvar from '../HomeNanvar/HomeNanvar';
import HomeVistaContactos from '../HomeVistaContacto/HomeVistaContactos';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; // Importa useDispatch para usar dispatch
import { auth } from '../../../../api/firebase/FirebaseConfig/FirebaseConfig'; // Asegúrate de que la ruta sea correcta
import { signOut } from 'firebase/auth';
import styles from './HomeComponentsMainStyle'; // Asegúrate de que la ruta sea correcta


const HomeComponentsMain = () => {
  const navigation = useNavigation(); // Para navegar
  const dispatch = useDispatch(); // Inicializa dispatch
  const isFocused = useIsFocused(); // Verifica si el componente está enfocado

  useEffect(() => {
    if (!isFocused) {
      return; // No hacer nada si el componente no está enfocado
    }

    const backAction = () => {
      // Preguntar si el usuario desea desloguearse
      Alert.alert(
        "Cerrar sesión",
        "¿Deseas Cerrar Sesion?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Cerrar Sesion",
            onPress: async () => {
              try {
                await signOut(auth); // Desloguear al usuario
                navigation.navigate("LoginUser"); // Navegar a la pantalla de inicio de sesión
                dispatch({ type: "GET_DOCUMENT_ID", payload: null }); // Llamada al dispatch
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
  }, [dispatch, navigation, isFocused]); // Asegúrate de incluir isFocused en las dependencias

  
  return (
    <View >
      <HomeNanvar />
      <HomeVistaContactos />
      
    </View>
  );
};

export default HomeComponentsMain;
