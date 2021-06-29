import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import DiaryListScreen from "../screens/DiaryListScreen";
import DiaryListTopTabBar from "../components/TabBar/DiaryListTopTabBar";
import MyInfo from "../screens/ViewAllScreen";

const DiaryListTopTab = createMaterialTopTabNavigator();

const DiaryListTopTabNavigator = () => {
  return (
    <>
      <DiaryListTopTab.Navigator
        initialRouteName="All"
        tabBar={(props) => <DiaryListTopTabBar {...props} />}
      >
        <DiaryListTopTab.Screen
          name="All"
          component={DiaryListScreen}
          options={{ tabBarLabel: "All" }}
        />
        <DiaryListTopTab.Screen
          name="By Date"
          component={MyInfo}
          options={{ tabBarLabel: "By Date" }}
        />
      </DiaryListTopTab.Navigator>
    </>
  );
};

export default DiaryListTopTabNavigator;
