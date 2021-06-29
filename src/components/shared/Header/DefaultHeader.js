import React from "react";
import { View, SafeAreaView, StyleSheet, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const DefaultHeader = () => {
  return (
    <View>
      <SafeAreaView style={styles.statusBar}>
        <StatusBar />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#ffffff",
    height: STATUSBAR_HEIGHT,
  },
});

export default DefaultHeader;
