import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStackNavigator from "./AuthStackNavigator";
import NewDiaryModalScreen from "../screens/NewDiaryModalScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import setHeaderOptions from "./headerConfig/setHeaderOptions";
import DiarySelectionModalScreen from "../screens/DiarySelectionModalScreen";

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  const { id } = useSelector((state) => state.user.userInfo);

  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      {id ? (
        <>
          <RootStack.Screen
            name="BottomTab"
            component={BottomTabNavigator}
            options={({ route }) => setHeaderOptions("getHeaderByRoute", route)}
          />
          <RootStack.Screen
            name="NewDiaryModal"
            component={NewDiaryModalScreen}
            options={{ unmountOnBlur: true, ...setHeaderOptions("noHeader") }}
          />
          <RootStack.Screen
            name="DiarySelection"
            component={DiarySelectionModalScreen}
            options={{ unmountOnBlur: true, ...setHeaderOptions("noHeader") }}
          />
        </>
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={setHeaderOptions("noHeader")}
        />
      )}
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
