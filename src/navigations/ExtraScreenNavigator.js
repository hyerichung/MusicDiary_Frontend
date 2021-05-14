import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute, Text } from "@react-navigation/native";

import DiaryScreen from "../screens/DiaryScreen";

const ExtraStack = createStackNavigator();

const ExtraScreenNavigator = ({ route }) => {
  function getHeader(route, props) {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case "Diary":
        return <Text {...props}>{routeName}</Text>;
    }
  }

  return (
    <>
      <ExtraStack.Navigator>
        <ExtraStack.Screen
          name="Diary"
          component={DiaryScreen}
          options={({ route }) => ({
            headerTitle: "diary, needs to fix left main text",
          })}
        />
      </ExtraStack.Navigator>
    </>
  );
};

export default ExtraScreenNavigator;
