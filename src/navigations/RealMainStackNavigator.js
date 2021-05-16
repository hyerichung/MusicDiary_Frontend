import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import MainBottomTabNavigator from "./MainBottomTabNavigator";
import ExtraScreenNavigator from "./ExtraScreenNavigator";

const RealMainStack = createStackNavigator();

const RealMainStackNavigator = () => {
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
    <>
      <RealMainStack.Navigator>
        <RealMainStack.Screen
          name="Main"
          component={MainBottomTabNavigator}
          options={({ route }) => ({
            header: (props) => getHeader(route, props),
          })}
        />
        <RealMainStack.Screen
          name="Extra"
          component={ExtraScreenNavigator}
          options={({ route }) => ({
            header: (props) => getHeader(route, props),
          })}
        />
      </RealMainStack.Navigator>
    </>
  );
};

export default RealMainStackNavigator;
