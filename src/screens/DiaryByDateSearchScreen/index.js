import React from "react";
import { View, Button } from "react-native";
import DiaryList from "../../components/DiaryList";

const DiaryByDateSearchScreen = ({ route, navigation }) => {
  function handleDiaryPressBtn(diaryInfo) {
    navigation.navigate("Extra", {
      screen: "Diary",
      params: { data: diaryInfo },
    });
  }

  return (
    <View>
      <Button title="diary by date....default.." />
      <DiaryList onPressDiary={handleDiaryPressBtn} />
    </View>
  );
};

export default DiaryByDateSearchScreen;
