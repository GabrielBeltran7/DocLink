import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useEffect } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterUser } from "./src/screens/users/Register/RegisterUser";
import { Provider } from "react-redux";
import { store } from "./src/Redux/Store";
import { LoginUser } from "./src/screens/users/Login/LoginUser";
import { UserRecoverPassword } from "./src/screens/users/UserRecoverPassword/UserRecoverPassword";
import HomeMain from "./src/screens/home/HomeMain/HomeMain";
import RegisterDocuments from "./src/components/RegisterDocuments/RegisterDocumentsComponent";
import UpdateComponentsDocuments from "./src/components/UpdateDocuments/UpdateComponentsDocuments";
import HomeComponentChat from "./src/components/home/HomeComponentChat/HomeComponentChat";

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginUser">
          <Stack.Screen
            name="LoginUser"
            component={LoginUser}
            options={{ title: "Inicio de Sesion" }}
          />

          <Stack.Screen
            name="RegisterDocuments"
            component={RegisterDocuments}
            options={{ title: "Registrar Documento o Placa" }}
          />

         
          <Stack.Screen
            name="HomeComponentChat"
            component={HomeComponentChat}
            options={{
              title: "Chat DocLink",
              headerBackVisible: false, // Oculta la flecha de retroceso
              headerLeft: () => null,
              headerTitleAlign: 'center', // Centra el título
              headerStyle: {
                height: 20, // Ajusta la altura del encabezado
              },
              headerTitleStyle: {
                color: 'black', // Cambia el color del texto
              },
            }}
          />
          <Stack.Screen
            name="UpdateComponentsDocuments"
            component={UpdateComponentsDocuments}
            options={{ title: "Actualizar Documentos" }}
          />
          <Stack.Screen
            name="UserRecoverPassword"
            component={UserRecoverPassword}
            options={{ title: "Recuperar Contraseña" }}
          />
          <Stack.Screen
            name="HomeMain"
            component={HomeMain}
            options={{
              title: "Prueba",
              headerLeft: () => false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegisterUser"
            component={RegisterUser}
            options={{ title: "Registro" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}
