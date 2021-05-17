import React from "react";
import { StyleSheet, StatusBar, View, Text, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const DiaryTopTab = createMaterialTopTabNavigator();

import DiaryByHashTagSearchScreen from "../screens/DiaryByHashTagSearchScreen";
import DiaryByDateSearchScreen from "../screens/DiaryByDateSearchScreen";

const DiaryTopTabNavigator = ({ navigation }) => {
  function handleOpenAddNewDiaryModal() {
    navigation.navigate("Modal", {
      screen: "addNewDiaryModal",
    });
  }

  return (
    <>
      <DiaryTopTab.Navigator initialRouteName="ByDate">
        <DiaryTopTab.Screen name="ByDate" component={DiaryByDateSearchScreen} />
        <DiaryTopTab.Screen
          name="Hashtag"
          component={DiaryByHashTagSearchScreen}
        />
      </DiaryTopTab.Navigator>
      <Button title="AddNewDiary" onPress={handleOpenAddNewDiaryModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    paddingTop: StatusBar.currentHeight,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DiaryTopTabNavigator;
