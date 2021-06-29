import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SingleDiaryScreen from "../screens/SingleDiaryScreen";
import TrackSearchModalScreen from "../screens/TrackSearchScreen";
import setHeaderOptions from "./headerConfig/setHeaderOptions";
import DiaryListTopTabNavigator from "./DiaryListTopTabNavigator";

const DiaryListStack = createStackNavigator();

const DiaryListStackNavigator = () => {
  return (
    <DiaryListStack.Navigator>
      <DiaryListStack.Screen
        name="AllDiaries"
        component={DiaryListTopTabNavigator}
        options={({ navigation }) =>
          setHeaderOptions("AllDiariesHeader", null, navigation)
        }
      />
      <DiaryListStack.Screen
        name="SingleDiaryDetail"
        component={SingleDiaryScreen}
        options={({ navigation }) =>
          setHeaderOptions("SingleDiaryDetailHeader", null, navigation)
        }
      />
      <DiaryListStack.Screen
        name="TrackSearch"
        component={TrackSearchModalScreen}
        options={setHeaderOptions("noHeader")}
      />
    </DiaryListStack.Navigator>
  );
};

export default DiaryListStackNavigator;
