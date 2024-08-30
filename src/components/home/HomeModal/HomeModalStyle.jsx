// HomeModalStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   width:30,
   left: -15,
    padding: 35, // Añadir padding para evitar que el contenido se pegue a los bordes
    backgroundColor: '#04f9fc', // Color de fondo suave
  },
  menuButton: {
    position: "absolute",
    top: 32,
    left: 10,
    zIndex: 1,
    backgroundColor: "black", // Fondo azul para el botón
    padding: 11,
    borderRadius: 25, // Bordes redondeados para el botón
    shadowColor: "#000", // Sombra para el botón
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Sombra para Android
  },
  menuContent: {
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Fondo blanco con ligera transparencia
    padding: 20,
    borderRadius: 15, // Bordes redondeados
    shadowColor: "#000", // Sombra para el modal
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
    alignItems: "center", // Centrar los elementos dentro del modal
  },
  menuItem: {
    marginVertical: 10,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#04fcfc', // Fondo azul para los elementos del menú
    color: '#fff', // Texto blanco
    shadowColor: "#000", // Sombra para los elementos del menú
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Sombra para Android
  },
  menuText: {
    color: 'black', // Texto blanco
    fontSize: 16, // Tamaño de fuente más grande para mejor visibilidad
    fontWeight: 'bold', // Texto en negrita para mejor legibilidad
  },
});

export default styles;
