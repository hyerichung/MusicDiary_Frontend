import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import ModalScreenNavigator from "../navigations/ModalScreenNavigator";

import RealMainStackNavigator from "../navigations/RealMainStackNavigator";

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  const isLoggedIn = useSelector((state) => Boolean(state.user.accessToken));

  return (
    <Stack.Navigator mode="modal">
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="RealMain"
            options={{ headerShown: false }}
            component={RealMainStackNavigator}
          />
          <Stack.Screen
            name="Modal"
            component={ModalScreenNavigator}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
