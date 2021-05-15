import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { format, parseISO } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import DiaryList from "../../components/DiaryList";
import { fetchDiaryByDate } from "../../redux/slices/diarySlice";
import { useIsFocused } from "@react-navigation/native";

const DiaryByDateSearchScreen = ({ route, navigation, diaryBytDate }) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);
  const { byIds } = useSelector((state) => state.diary);

  if (isFocused) {
    console.log("focused by date?");
  }

  function handleDiaryPressBtn(diaryInfo) {
    navigation.navigate("Extra", {
      screen: "Diary",
      params: { data: diaryInfo },
    });
  }

  return (
    <View>
      <Button title="diary by date....default.." />
      <DiaryList
        diaryList={Object.values(byIds)}
        onPressDiary={handleDiaryPressBtn}
      />
    </View>
  );
};

export default DiaryByDateSearchScreen;
