import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ViewAllScreen from "../screens/ViewAllScreen";
import SingleDiaryScreen from "../screens/SingleDiaryScreen";
import setHeaderOptions from "../navigation/headerConfig/setHeaderOptions";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator headerMode="screen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={setHeaderOptions("HomeScreenHeader")}
      />
      <HomeStack.Screen
        name="HomeDiaryDetail"
        component={SingleDiaryScreen}
        options={({ navigation }) =>
          setHeaderOptions("HomeDiaryDetailHeader", null, navigation)
        }
      />
      <HomeStack.Screen
        name="ViewAll"
        component={ViewAllScreen}
        options={setHeaderOptions("noHeader")}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
