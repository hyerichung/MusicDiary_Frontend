import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewDiaryAddingModalScreen from "../screens/NewDiaryAddingModalScreen";

const ModalStack = createStackNavigator();

const ModalScreenNavigator = () => {
  return (
    <>
      <ModalStack.Navigator mode="modal">
        <ModalStack.Screen
          name="addNewDiaryModal"
          component={NewDiaryAddingModalScreen}
          options={{ headerShown: false }}
        />
      </ModalStack.Navigator>
    </>
  );
};

export default ModalScreenNavigator;
