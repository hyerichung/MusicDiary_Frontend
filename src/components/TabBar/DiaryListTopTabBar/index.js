import React from "react";
import { View, StyleSheet } from "react-native";
import generateRoutableButton from "../ButtonConfig/generateRoutableButton";

const DiaryListTopTabBar = ({ state, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tapOptions}>
        {generateRoutableButton(state, navigation, "LabelButton")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  tapOptions: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default DiaryListTopTabBar;
