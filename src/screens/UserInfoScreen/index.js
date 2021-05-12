import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, Button } from "react-native";
import { clearAccessToken } from "../../redux/slices/userSlice";

import styles from "./styles";

const UserInfoScreen = () => {
  const dispatch = useDispatch();
  const { userName, email } = useSelector((state) => state.userInfo);

  const handleLogoutClick = async () => {
    try {
      await dispatch(clearAccessToken());
    } catch (err) {
      console.error("failed to clear Token with logout", err);
    }
  };

  return (
    <View>
      <View styles={styles.container}>
        <Text>{userName}</Text>
        <Text>{email}</Text>
      </View>
      <Button onPress={handleLogoutClick} title="Logout" />
    </View>
  );
};

export default UserInfoScreen;
