import React, { useState } from "react";
import { Provider } from "react-redux";

import AppNavigation from "./src/navigations/AppNavigation";
import { store } from "./src/redux/store";
import AppLoading from "expo-app-loading";
import SplashScreen from "./src/screens/SplashScreen";
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
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  let [fontsLoaded] = useFonts({
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
