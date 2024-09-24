import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",  // Ancho al 100%
    height: "100%", // Alto al 100%
    resizeMode: "cover",  // Asegura que la imagen cubra todo el fondo
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
    padding: 15,
    marginTop: -20, // Ajuste para mejor visualización
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",  // Fondo semitransparente
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
    height: 35,
    paddingLeft: 10,
    marginLeft: 10,
    fontSize:12
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
    marginVertical: 30,
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
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default styles;




