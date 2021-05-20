import React from "react";
import { StyleSheet, StatusBar, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const DiaryTopTab = createMaterialTopTabNavigator();

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
        <DiaryTopTab.Screen 
          name="ByDate" 
          component={DiaryByDateSearchScreen} 
          options={({ route }) => ({
          headerTitle: () => <Text>asdfwfasdfdasfsadfdsf</Text>,
          header: (props) => getHeader(route, props),
        })}/>
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
