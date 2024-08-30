// HomeNavbarStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#04f9fc', // Color de fondo azul
    paddingVertical: 30, // Más espacio vertical para mejor apariencia
    paddingHorizontal: 20, // Añadir espacio horizontal
    borderRadius: 10, // Bordes redondeados para una apariencia más moderna
    shadowColor: "#000", // Sombra para dar un efecto de elevación
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4, // Sombra para Android
    marginHorizontal: 0, // Margen lateral para evitar que toque los bordes
    marginBottom: 10, // Margen inferior para dar espacio al contenido
  },
  container: {
    flexDirection: 'row', // Mantener en fila
    alignItems: 'center', // Centrar elementos verticalmente
    justifyContent: 'space-between', // Espacio entre los elementos
  },
  item: {
    flex: 1, // Ocupa el espacio disponible proporcionalmente
    marginHorizontal: 0, // Margen horizontal para separar elementos
  },
});

export default styles;


