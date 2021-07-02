import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import splash from "../../assets/new_black.png";

const SplashAnimationScreen = ({ onAppReady }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={splash} style={styles.img}>
        <LottieView
          source={require("../../assets/animations/black.json")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    flex: 1,
    resizeMode: "contain",
  },
  animation: {
    position: "absolute",
    alignSelf: "center",
    top: 45,
    width: 270,
    height: 270,
  },
});

export default SplashAnimationScreen;
