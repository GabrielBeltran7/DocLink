import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE5DD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  headerTitle: {
    fontSize: 20,

    padding: 10,
    backgroundColor: "transparent", // Cambiado a transparente
    color: "black",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  receivedMessage: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginBottom: 90, // Agregado para margen inferior
    maxWidth: "75%",
    alignSelf: "flex-start",
  },
  sentMessage: {
    backgroundColor: "#DCF8C6",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "75%",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageTime: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 5,
  },
  checkIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  checksWrapper: {
    flexDirection: "row", // Para alinear los checks horizontalmente
    alignItems: "center",
    marginLeft: 5, // Espacio entre los dos checks
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    backgroundColor: "#f0f0f0",
  },
  sendButton: {
    backgroundColor: "#04f9fc",
    borderRadius: 20,
    padding: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default styles;
