import React, { useState } from "react";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import FlashMessage from "react-native-flash-message";

import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/redux/store";
import SplashAnimationScreen from "./src/screens/SplashAnimationScreen";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleAppReady = async () => {
    await SplashScreen.hideAsync();
    setIsAppReady(true);
  };

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
