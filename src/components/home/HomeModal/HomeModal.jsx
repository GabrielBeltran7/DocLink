// HomeModal.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalMenu from "react-native-modal";
import styles from "./HomeModalStyle";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useDispatch } from 'react-redux'; // Importa useDispatch para usar dispatch


const HomeModal = () => {
  const dispatch = useDispatch(); // Inicializa dispatch
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const deslogueo = () => {
    auth.signOut();
    navigation.navigate("LoginUser");
    dispatch({ type: "GET_DOCUMENT_ID", payload: null }); // Llamada al dispatch
  };

const registerDocuments =() =>{
  navigation.navigate("RegisterDocuments");

}
  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Icon name="bars" size={24} color="#fff" />
      </TouchableOpacity>

      <ModalMenu isVisible={isMenuVisible} onBackdropPress={toggleMenu}>
        <View style={styles.menuContent}>
       

          <TouchableOpacity onPress={registerDocuments} style={styles.menuItem}>
            <Text style={styles.menuText}>Registrar Documento o Placa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
            <Text style={styles.menuText}>Menú</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={deslogueo} style={styles.menuItem}>
            <Text style={styles.menuText}>Desloguearse</Text>
          </TouchableOpacity>

        </View>
      </ModalMenu>
    </View>
  );
};

export default HomeModal;
