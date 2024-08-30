import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      marginBottom: 10,
    },
    icon: {
      padding: 10,
    },
    input: {
      flex: 1,
      padding: 10,
      fontSize: 16,
    },
    cameraButton: {
      backgroundColor: 'black', // Color de fondo del botón
      width: 80, // Ancho del botón
      height: 80, // Alto del botón
      borderRadius: 40, // Para hacerlo redondo, el radio debe ser la mitad del ancho/alto
      justifyContent: 'center',
      alignItems: 'center',
    margin:30,
      padding:5,
      bottom: 20, // Puedes ajustar la posición vertical
      right: 20, // Puedes ajustar la posición horizontal
    }
  });
  export default styles