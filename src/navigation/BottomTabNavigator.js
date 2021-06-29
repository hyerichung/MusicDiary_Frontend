import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ConfiguredBottomTabBar from "../components/TabBar/ConfiguredBottomTabBar";
import DiaryListStackNavigator from "./DiaryListStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";

import CalendarScreen from "../screens/CalendarScreen";
import MyInfo from "../screens/MyInfoScreen";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      backBehavior="none"
      tabBar={(props) => <ConfiguredBottomTabBar {...props} />}
    >
      <BottomTab.Screen name="Home" component={HomeStackNavigator} />
      <BottomTab.Screen name="DiaryList" component={DiaryListStackNavigator} />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ unmountOnBlur: true }}
      />
      <BottomTab.Screen
        name="MyInfo"
        component={MyInfo}
        options={{ unmountOnBlur: true }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
