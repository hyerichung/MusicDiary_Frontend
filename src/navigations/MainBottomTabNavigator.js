import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import PrivateDiaryListScreen from "../screens/PrivateDiaryListScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import TabBar from "../components/shared/TabBar";

const MainBottomTab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <MainBottomTab.Navigator
      backBehavior="initialRoute"
      tabBar={(navigation) => <TabBar navigation={navigation} />}
    >
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
