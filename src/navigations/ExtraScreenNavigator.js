import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DiaryScreen from "../screens/DiaryScreen";

const ExtraStack = createStackNavigator();

const ExtraScreenNavigator = ({ route }) => {
  return (
    <>
      <ExtraStack.Navigator>
        <ExtraStack.Screen name="Diary" component={DiaryScreen} />
      </ExtraStack.Navigator>
    </>
  );
};

export default ExtraScreenNavigator;
