// HomeSearchStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 20,
    width:315,
    left:-130,
    backgroundColor: '#04f9fc',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,  // Utiliza todo el espacio disponible
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 25,
    backgroundColor: '#fff',
    fontSize: 16,
    marginRight: 5,
    marginLeft:-18
  },
  searchButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 11, // Aumenta el área de clic
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginRight: -13
  },
});

export default styles;


