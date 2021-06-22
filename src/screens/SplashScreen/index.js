import React from "react";
import { View, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";

import styles from "./styles";
import splash from "../../../assets/new_black.png";

const SplashScreen = ({ onAppReady }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={splash} style={styles.img}>
        <LottieView
          source={require("../../../assets/animations/black.json")}
          autoPlay
          loop={false}
          style={styles.animation}
          speed={1.0}
          onAnimationFinish={onAppReady}
        />
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
