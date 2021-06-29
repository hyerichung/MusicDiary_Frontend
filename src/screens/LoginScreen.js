import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import LoginBtn from "../components/LoginButton";

import { showMessage } from "react-native-flash-message";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handlePressLoginBtn = async () => {
    const { error } = await dispatch(loginUser());

    if (error) {
      showMessage({
        message: "Login Failed, Please try again",
        type: "info",
        hideStatusBar: true,
        backgroundColor: "#1c1f28",
      });
    }
  };

  return (
    <>
      <LoginBtn onPressLoginBtn={handlePressLoginBtn} />
    </>
  );
};

export default LoginScreen;
