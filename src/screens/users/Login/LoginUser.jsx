import React from "react";
import LoginComponents from "../../../components/user/Login/LoginComponents";
import styles from "./LoginUserStyle";
import { View,Text } from "react-native";

export const LoginUser = ({ navigation }) => {
  console.log(navigation);
  return (
    <View className={styles.container}>
      <LoginComponents />
      <Text>hola</Text>
    </View>
  );
};
