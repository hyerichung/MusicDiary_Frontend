import React from "react";

import LoginBtn from "../components/LoginButton";
import useLogin from "../hooks/useLogin";

const LoginScreen = () => {
  const { handlePressLoginBtn } = useLogin();
  return (
    <>
      <LoginBtn onPressLoginBtn={handlePressLoginBtn} />
    </>
  );
};

export default LoginScreen;
