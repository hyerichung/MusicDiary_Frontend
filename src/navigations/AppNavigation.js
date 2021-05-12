import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { StyleSheet, Text, View, Button } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import {
  getAccessToken,
  clearAccessToken,
  loginUser,
} from "../redux/slices/userSlice";

import Loading from "../screens/Loading/";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const isLogedIn = useSelector((state) => !!state.accessToken);

  useEffect(() => {
    const loadAccessToken = async () => {
      try {
        const resultAction = await dispatch(getAccessToken());

        console.log(resultAction, "RESULTACTION");
        const accessToken = unwrapResult(resultAction);

        if (!accessToken) {
          console.warn("No token from secure store");
        }
      } catch (err) {
        console.error("failed to load accessToken from secure store", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAccessToken();
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const LoginScreen = () => {
    const dispatch = useDispatch();

    const handlePressLogin = () => {
      dispatch(loginUser());
    };

    return (
      <View>
        <Button onPress={handlePressLogin} title="Login" />
      </View>
    );
  };

  const HomeScreen = () => {
    const handleLogoutClick = async () => {
      try {
        await dispatch(clearAccessToken());
      } catch (err) {
        console.error("failed to clear Token with logout", err);
      }
    };

    return (
      <View>
        <Button title="home" />
        <Button onPress={handleLogoutClick} title="Logout" />
      </View>
    );
  };

  const authScreens = {
    LoginScreen,
  };

  const userScreens = {
    HomeScreen,
  };

  return (
    <Stack.Navigator>
      {isLogedIn ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
