import React from "react";
import { View, Button, Text, StyleSheet, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import PrivateDiaryTopTabNavigator from "./PrivateDiaryTopTabNavigator";

const DiaryStack = createStackNavigator();

const PrivateDiaryListScreenNavigator = () => {
  const navigation = useNavigation();

  function handleOpenAddNewDiaryModal() {
    navigation.navigate("Modal", {
      screen: "addNewDiaryModal",
    });
  }

  return (
    <>
      <View style={styles.container}>
        <Text>search bar</Text>
      </View>

      <DiaryStack.Navigator>
        <DiaryStack.Screen
          name="DiaryTopTap"
          component={PrivateDiaryTopTabNavigator}
          options={{ headerShown: false }}
        />
      </DiaryStack.Navigator>
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

export default PrivateDiaryListScreenNavigator;
