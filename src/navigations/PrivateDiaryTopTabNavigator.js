import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const DiaryTopTab = createMaterialTopTabNavigator();

import DiaryByLocationSearchScreen from "../screens/DiaryByLocationSearchScreen";
import DiaryByHashTagSearchScreen from "../screens/DiaryByHashTagSearchScreen";
import DiaryByDateSearchScreen from "../screens/DiaryByDateSearchScreen";

const DiaryTopTabNavigator = () => {
  return (
    <>
      <DiaryTopTab.Navigator initialRouteName="ByDate">
        <DiaryTopTab.Screen name="ByDate" component={DiaryByDateSearchScreen} />
        <DiaryTopTab.Screen
          name="Location"
          component={DiaryByLocationSearchScreen}
        />
        <DiaryTopTab.Screen
          name="Hashtag"
          component={DiaryByHashTagSearchScreen}
        />
      </DiaryTopTab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DiaryTopTabNavigator;
