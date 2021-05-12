import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import MainBottomTabNavigator from "./MainBottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  const isLoggedIn = useSelector((state) => Boolean(state.accessToken));

  const authScreens = {
    LoginScreen: LoginScreen,
  };

  const mainScreens = {
    MainBottomTab: MainBottomTabNavigator,
  };

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

    switch (routeName) {
      case "Home":
        return "Your Current Location";
      case "PrivateDiary":
        return "Private Diary";
      case "My":
        return "My";
    }
  }

  return (
    <Stack.Navigator headerMode={isLoggedIn ? "screen" : "none"}>
      {Object.entries({
        ...(isLoggedIn ? mainScreens : authScreens),
      }).map(([screenName, component], idx) => (
        <Stack.Screen
          key={idx}
          name={screenName}
          component={component}
          options={({ route }) => ({
            title: getHeaderTitle(route),
            headerStyle: {
              backgroundColor: "#3446cf",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
