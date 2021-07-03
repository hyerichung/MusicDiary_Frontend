import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import LoginBtn from "../components/LoginButton";
import { debounce } from "lodash";

import { showMessage } from "react-native-flash-message";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handlePressLoginBtn = debounce(
    useCallback(async () => {
      const { error } = await dispatch(loginUser());

      if (error) {
        showMessage({
          message: "Login Failed, Please try again",
          type: "error",
          hideStatusBar: true,
          backgroundColor: "#A32700",
        });
      }
    }, [dispatch]),
    1500
  );

  return (
    <>
      <LoginBtn onPressLoginBtn={handlePressLoginBtn} />
    </>
  );
};

export default LoginScreen;
