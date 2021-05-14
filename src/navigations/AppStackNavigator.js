import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Text } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import MainBottomTabNavigator from "./MainBottomTabNavigator";
import PrivateDiaryListScreenNavigator from "./PrivateDiaryListScreenNavigator";
import ExtraScreenNavigator from "../navigations/ExtraScreenNavigator";

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  const isLoggedIn = useSelector((state) => Boolean(state.user.accessToken));

  function getHeader(route, props) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

    switch (routeName) {
      case "PrivateDiary":
      case "My":
        return <Text {...props}>{routeName}</Text>;
      case "Home":
      case "Extra":
        return null;
    }
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={MainBottomTabNavigator}
            options={({ route }) => ({
              header: (props) => getHeader(route, props),
            })}
          />
          <Stack.Screen
            name="PrivateDiaryList"
            component={PrivateDiaryListScreenNavigator}
          />

          <Stack.Screen
            name="Extra"
            component={ExtraScreenNavigator}
            options={({ route }) => ({
              header: (props) => getHeader(route, props),
            })}
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
