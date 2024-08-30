import React from "react";
import { UserRecoverPasswordComponents } from "../../../components/user/UserRecoverPassword/UserRecoverPasswordComponents";
import styles from "./UserRecoverPasswordStyle";
import { View } from "react-native";

export const UserRecoverPassword = () => {
  return (
    <View className={styles.container}>
      <UserRecoverPasswordComponents />
    </View>
  );
};
