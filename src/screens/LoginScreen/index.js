import React from "react";
import { View, Button } from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handlePressLogin = async () => {
    await dispatch(loginUser());
  };

  return (
    <View>
      <Button onPress={handlePressLogin} title="Login" />
    </View>
  );
};

export default LoginScreen;
