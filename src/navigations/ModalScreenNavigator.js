import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewDiaryAddingModalScreen from "../screens/NewDiaryAddingModalScreen";
import EditDiaryModalScreen from "../screens/EditDiaryModalScreen";

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
        <ModalStack.Screen
          name="editDiaryModal"
          component={EditDiaryModalScreen}
          options={{ headerShown: false }}
        />
      </ModalStack.Navigator>
    </>
  );
};

export default ModalScreenNavigator;
