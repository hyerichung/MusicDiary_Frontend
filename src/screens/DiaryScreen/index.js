import React from "react";
import { View, Button } from "react-native";
import Diary from "../../components/Diary";

const DiaryScreen = ({ route, navigation }) => {
  const data = route.params;

  return (
    <View>
      <Button title="diary screen......" />
      <Diary data={data} />
    </View>
  );
};

export default DiaryScreen;
