import React from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  Image,
  Text,
  Dimensions,
} from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";

import PrivateDiaryTopTabNavigator from "./PrivateDiaryTopTabNavigator";
import DiaryScreen from "../screens/DiaryScreen";
import NewTrackAddingModalScreen from "../screens/NewTrackAddingModalScreen";

const DiaryStack = createStackNavigator();

const PrivateDiaryListScreenNavigator = () => {
  const navigation = useNavigation();

  function getHeader(route) {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case "SingleDiary":
        return null;
    }
  }

  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen
        name="DiaryTopTap"
        component={PrivateDiaryTopTabNavigator}
        options={{ headerShown: false }}
      />
      <DiaryStack.Screen
        name="SingleDiary"
        component={DiaryScreen}
        options={({ route }) => ({
          headerTitle: null,
          headerLeft: (props) => (
            <HeaderBackButton
              style={styles.backBtn}
              tintColor="pink"
              label=" "
              onPress={() =>
                navigation.navigate("DiaryTopTap", { screen: "PlayList" })
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
  );
};

const styles = StyleSheet.create({
  backBtn: {
    marginLeft: 5,
  },
});

export default PrivateDiaryListScreenNavigator;
