import React from "react";
import { View, StyleSheet } from "react-native";
import generateRoutableButton from "../ButtonConfig/generateRoutableButton";

const BottomTabBar = ({ state, navigation }) => {
  return (
    <View style={styles.bottomTabBarContainer}>
      {generateRoutableButton(state, navigation, "IconButton")}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBarContainer: {
    flexDirection: "row",
    borderTopWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.2)",
    paddingTop: "4%",
    paddingBottom: "4%",
    backgroundColor: "white",
  },
});

export default BottomTabBar;
