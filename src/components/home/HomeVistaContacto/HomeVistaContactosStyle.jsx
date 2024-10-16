import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  copyButton: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttonClose: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    color: '#333',
    textAlign: "center",
  },
  title1: {
    fontSize: 15,
    color: '#333',
    textAlign: "center",
    margin: 10,
  },
  button: {
    backgroundColor: '#F0F0F0', // Color de fondo más suave
    paddingVertical: 20, // Un poco menos de padding
    paddingHorizontal: 40, // Ajustar el padding horizontal
    borderRadius: 10, // Esquinas más redondeadas
    borderWidth: 3, // Añadir un borde
    borderColor: '#D3D3D3', // Color del borde
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FFFF', // Color de la sombra
    marginBottom: 1,
    marginTop: 25,
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.9, // Opacidad de la sombra
    shadowRadius: 0.9, // Difuminado de la sombra
    elevation: 24, // Elevación para Android
  },
  buttonText: {
    color: '#333', // Color de texto
    fontSize: 16, // Tamaño de texto más grande
    fontWeight: '600', // Grosor del texto
    textAlign: 'center',
  },
  // Estilos para el estado presionado
  pressedButton: {
    backgroundColor: '#00FFFF', // Color más oscuro al presionar
  },
  containerboton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F0F0F0',
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  notFoundText: {
    fontSize: 18,
    color: '#FF0000', // Color rojo para destacar el mensaje
    textAlign: 'center',
    marginTop: 20,
  },
  copyMessage: { // Nuevo estilo para el mensaje de copiado
    marginTop: 10,
    color: "green",
    textAlign: "center",
    fontSize: 16,
  },
  container: {
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    color: '#333',
    textAlign: "center",
  },
  title1: {
    fontSize: 15,
    color: '#333',
    textAlign: "center",
    margin:10
  },
  button: {
    backgroundColor: '#F0F0F0', // Color de fondo más suave
    paddingVertical: 20, // Un poco menos de padding
    paddingHorizontal: 40, // Ajustar el padding horizontal
    borderRadius: 10, // Esquinas más redondeadas
    borderWidth: 3, // Añadir un borde
    borderColor: '#D3D3D3', // Color del borde
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FFFF', // Color de la sombra
   marginBottom:1,
   marginTop:25,
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.9, // Opacidad de la sombra
    shadowRadius: 0.9, // Difuminado de la sombra
    elevation: 24, // Elevación para Android
  },
  buttonText: {
    color: '#333', // Color de texto
    fontSize: 16, // Tamaño de texto más grande
    fontWeight: '600', // Grosor del texto
    textAlign: 'center',
  },
  // Estilos para el estado presionado
  pressedButton: {
    backgroundColor: '#00FFFF', // Color más oscuro al presionar
  },
  containerboton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F0F0F0',
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  notFoundText: {
    fontSize: 18,
    color: '#FF0000', // Color rojo para destacar el mensaje
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;










