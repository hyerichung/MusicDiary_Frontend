import React from "react";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";

import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { store } from "./src/redux/store";
import SplashAnimationScreen from "./src/screens/SplashAnimationScreen";
import useAppReady from "./src/hooks/useAppReady";

export default function App() {
  const { isAppReady, handleAppReady } = useAppReady();

  return (
    <>
      {isAppReady ? (
        <Provider store={store}>
          <NavigationContainer>
            <RootStackNavigator />
            <FlashMessage position="top" />
          </NavigationContainer>
        </Provider>
      ) : (
        <SplashAnimationScreen onAppReady={handleAppReady} />
      )}
    </>
  );
}
