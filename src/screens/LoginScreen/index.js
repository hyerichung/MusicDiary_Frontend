import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import LoginButton from "../../components/LoginButton";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handlePressLoginBtn = async () => {
    await dispatch(loginUser());
  };

  return <LoginButton onPressLoginBtn={handlePressLoginBtn} />;
};

export default LoginScreen;
