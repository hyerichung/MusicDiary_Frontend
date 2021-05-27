import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import ModalScreenNavigator from "../navigations/ModalScreenNavigator";
import RealMainStackNavigator from "../navigations/RealMainStackNavigator";

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: "clamp",
            }),
          },
        }),
      }}
    >
      { userInfo?.id ? (
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
