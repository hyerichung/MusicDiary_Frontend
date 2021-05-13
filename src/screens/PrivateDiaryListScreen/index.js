import React from "react";
import { View, Button, Text, StyleSheet, StatusBar } from "react-native";
import DiaryTopTabNavigator from "../../navigations/DiaryTopTabNavigator";
import { useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

const DiaryStack = createStackNavigator();

const PrivateDiaryListScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>search bar</Text>
      </View>
      <DiaryStack.Navigator>
        <DiaryStack.Screen
          name="DiaryTopTap"
          component={DiaryTopTabNavigator}
          options={{ headerShown: false }}
        />
      </DiaryStack.Navigator>
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

export default PrivateDiaryListScreen;
