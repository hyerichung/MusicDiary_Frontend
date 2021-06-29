import React from "react";
import { View, SafeAreaView, Image, StyleSheet, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const HeaderWithLogo = () => {
  return (
    <View>
      <SafeAreaView style={styles.statusBar}>
        <StatusBar />
      </SafeAreaView>
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={require("../../../../assets/header_logo.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  statusBar: {
    backgroundColor: "#ffffff",
    height: STATUSBAR_HEIGHT,
  },
  img: {
    width: 55,
    height: 55,
  },
});

export default HeaderWithLogo;
