import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppNavigation from "./src/navigations/AppNavigation";
import AppLoading from "expo-app-loading";
import SplashScreen from "./src/screens/SplashScreen";
import {
  useFonts,
  Nobile_400Regular,
  Nobile_400Regular_Italic,
  Nobile_500Medium,
  Nobile_500Medium_Italic,
  Nobile_700Bold,
  Nobile_700Bold_Italic,
} from "@expo-google-fonts/nobile";

// import SplashAnimation from "./screens/SplashAnimation/SplashAnimation";

export default function App() {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  let [fontsLoaded] = useFonts({
    Nobile_400Regular,
    Nobile_400Regular_Italic,
    Nobile_500Medium,
    Nobile_500Medium_Italic,
    Nobile_700Bold,
    Nobile_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleAnimationFinish = () => {
    setIsAnimationFinished(true);
  };

  return (
    <>
      {!isAnimationFinished ? (
        <SplashScreen handleAnimationFinish={handleAnimationFinish} />
      ) : (
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      )}
    </>
  );
}
