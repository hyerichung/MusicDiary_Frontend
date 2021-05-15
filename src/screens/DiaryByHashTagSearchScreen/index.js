import React from "react";
import { View, Button } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const DiaryByHashTagSearchScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  if (isFocused) {
    console.log("by hash focused@@@@@@@@@@@@@@@");
  }

  return (
    <View>
      <Button title="DiaryByHashTagSearchScreen ######" />
    </View>
  );
};

export default DiaryByHashTagSearchScreen;
