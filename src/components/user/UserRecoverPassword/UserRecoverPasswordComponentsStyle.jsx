import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",  // Ancho al 100%
    height: "100%", // Alto al 100%
    resizeMode: "cover",  // Asegura que la imagen cubra todo el fondo
  },
  keyboardAvoidingView: {
    flex: 1,  // Se expande para llenar el contenedor
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",  // Centra el contenido verticalmente
    alignItems: "center",  // Centra el contenido horizontalmente
    padding: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginTop: -350,
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.0)",  // Fondo semitransparente
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
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 40,
    paddingLeft: 10,
    marginLeft: 10,
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
    fontSize: 14,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default styles;


