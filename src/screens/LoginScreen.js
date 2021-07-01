import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import LoginBtn from "../components/LoginButton";
import { debounce } from "lodash";

import { showMessage } from "react-native-flash-message";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handlePressLoginBtn = debounce(async () => {
    const { error } = await dispatch(loginUser());

    if (error) {
      showMessage({
        message: "Login Failed, Please try again",
        type: "error",
        hideStatusBar: true,
        backgroundColor: "#A32700",
      });
    }
  }, 1000);

  return (
    <>
      <LoginBtn onPressLoginBtn={handlePressLoginBtn} />
    </>
  );
};

export default LoginScreen;
