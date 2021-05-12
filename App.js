import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./src/redux/store";
import AppNavigation from "./src/navigations/AppNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}
