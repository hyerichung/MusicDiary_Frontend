import React from "react";
import { View, Button, Text, StyleSheet, StatusBar } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const DiaryTopTab = createMaterialTopTabNavigator();

import DiaryByLocationSearchScreen from "../screens/DiaryByLocationSearchScreen";
import DiaryByHashTagSearchScreen from "../screens/DiaryByHashTagSearchScreen";

const DiaryTopTabNavigator = () => {
  return (
    <DiaryTopTab.Navigator>
      <DiaryTopTab.Screen
        name="Location"
        component={DiaryByLocationSearchScreen}
      />
      <DiaryTopTab.Screen
        name="Hashtag"
        component={DiaryByHashTagSearchScreen}
      />
    </DiaryTopTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DiaryTopTabNavigator;
