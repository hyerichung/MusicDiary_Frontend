import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import PrivateDiaryTopTabNavigator from "./PrivateDiaryTopTabNavigator";
import DiaryScreen from "../screens/DiaryScreen";
import NewTrackAddingModalScreen from "../screens/NewTrackAddingModalScreen";

const DiaryStack = createStackNavigator();

const PrivateDiaryListScreenNavigator = () => {
  const navigation = useNavigation();

  function getHeader(route, props) {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case "Diary":
        return null;
    }
  }

  return (
    <>
      <DiaryStack.Navigator>
        <DiaryStack.Screen
          name="DiaryTopTap"
          component={PrivateDiaryTopTabNavigator}
          options={{ headerShown: false }}
        />
        <DiaryStack.Screen
          name="Diary"
          component={DiaryScreen}
          options={({ route }) => ({
            headerTitle: (props) => getHeader(route, props),
            headerLeft: (props) => (
              <HeaderBackButton
                tintColor="pink"
                label=""
                onPress={() =>
                  navigation.navigate("DiaryTopTap", { screen: "ByDate" })
                }
              />
            ),
          })}
        />
        <DiaryStack.Screen
          name="addNewTrackModal"
          component={NewTrackAddingModalScreen}
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

export default PrivateDiaryListScreenNavigator;
