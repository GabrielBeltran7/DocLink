import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE5DD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECE5DD",
  },
  headerTitle: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "transparent",
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
    maxWidth: "75%",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  sentMessage: {
    backgroundColor: "#DCF8C6",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "75%",
    alignSelf: "flex-end",
    marginTop: 20,
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
  },
  checksWrapper: {
    flexDirection: "row",
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ECE5DD",
    borderRadius: 15,
    shadowColor: "#000",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#333333",
    fontFamily: "System",
    elevation: 2,
  },
  sendButton: {
    backgroundColor: "#00FFFF",
    borderRadius: 50,
    padding: 15,
  },
  senderName: {
    fontWeight: "bold",
    color: "blue",
  },
  senderNameMe: {
    fontWeight: "bold",
    color: "blue",
    marginTop: 0,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default styles;
