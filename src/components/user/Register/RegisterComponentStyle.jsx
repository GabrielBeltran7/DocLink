import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#F25B06",
    minHeight: 1500,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: "#f98f",
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "80%",

    height: 50,
  },
  button: {
    backgroundColor: "#ffe500",
    marginTop: 50,
    width: "50%",
    padding: 10,
    borderRadius: 20,
  },
  textbutton: {
    textAlign: "center",
  },
});

export default styles;
