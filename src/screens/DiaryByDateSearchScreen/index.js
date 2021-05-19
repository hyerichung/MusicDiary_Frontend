import React from "react";
import { View, Button } from "react-native";
import { useSelector } from "react-redux";
import DiaryList from "../../components/DiaryList";
import { useIsFocused } from "@react-navigation/native";

const DiaryByDateSearchScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { byIds } = useSelector((state) => state.diary);

  if (isFocused) {
    console.log("focused by date?");
  }

  function handleDiaryPressBtn(diaryInfo) {
    navigation.navigate("SingleDiary", { data: diaryInfo });
  }

  return (
    <View>
      <Button title="diary by dates..default..showing relevant diary with location.." />
      <DiaryList
        diaryList={Object.values(byIds)}
        onPressDiary={handleDiaryPressBtn}
      />
    </View>
  );
};

export default DiaryByDateSearchScreen;
