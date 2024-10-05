import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075E54',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  receivedMessage: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#075E54',
    padding: 10,
    borderRadius: 50,
  },
});

export default styles;







