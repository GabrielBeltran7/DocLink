import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 25,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    fontWeight: '800',
  },
  containerboton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    
  },
  notFoundText: {
    fontSize: 18,
    color: '#FF0000', // Color rojo para destacar el mensaje
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;






