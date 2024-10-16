import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  // Estilos existentes
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginTop: -50,
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
  iconInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -5,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 60,
    paddingLeft: 10,
    marginLeft: 10,
  },
  forgotPasswordText: {
    padding: 15,
    color: "black",
    textAlign: "center",
  },
  recoverText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 13,
  },
  button: {
    backgroundColor: "#04f9fc",
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
    padding: 12,
    borderRadius: 25,
  },
  textButton: {
    color: "black",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 3,
    marginBottom: 10,
    textAlign: "center",
  },
  // Estilo para el botón flotante
  floatingButton: {
    position: "absolute",
    top:750,
    bottom: 20,  // Espacio desde la parte inferior de la pantalla
    right: 20,   // Espacio desde la parte derecha de la pantalla
    width: 60,   // Ancho del botón
    height: 60,  // Alto del botón
    borderRadius: 30, // Para hacerlo redondo
    backgroundColor: "white", // Color de fondo
    alignItems: "center", // Alinear icono en el centro
    justifyContent: "center", // Justificar el contenido en el centro
    elevation: 5, // Elevación para Android
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
},
});

export default styles;
