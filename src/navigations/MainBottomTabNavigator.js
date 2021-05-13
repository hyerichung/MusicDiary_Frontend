import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import PrivateDiaryListScreen from "../screens/PrivateDiaryListScreen";
import UserInfoScreen from "../screens/UserInfoScreen";

const MainBottomTab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <MainBottomTab.Navigator backBehavior="initialRoute">
      <MainBottomTab.Screen name="Home" component={HomeScreen} />
      <MainBottomTab.Screen
        name="PrivateDiary"
        component={PrivateDiaryListScreen}
      />
      <MainBottomTab.Screen name="My" component={UserInfoScreen} />
    </MainBottomTab.Navigator>
  );
};

export default MainBottomTabNavigator;
