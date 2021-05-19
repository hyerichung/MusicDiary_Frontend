import React from "react";
import { View, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";

import styles from "./styles";

import splash from "../../../assets/splash_musicdiary.png";

const SplashScreen = ({ handleAnimationFinish }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={splash} style={styles.img} />
      <LottieView
        source={require("../../../assets/animations/splash_animation.json")}
        autoPlay
        loop={false}
        speed={0.6}
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
};

export default SplashScreen;
