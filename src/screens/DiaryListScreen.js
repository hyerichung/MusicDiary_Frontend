import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import DiaryList from "../components/DiaryList";

const DiaryListScreen = ({ navigation }) => {
  const { byIds } = useSelector((state) => state.diary);

  function handleSingleDiaryPress(diaryInfo) {
    navigation.navigate("DiaryDetail", { diary: diaryInfo });
  }

  const [diaryList, setDiaryList] = useState([]);

  const checkDiaryListLength = (diaryList) => {
    if (diaryList.length % 2 !== 0) {
      diaryList.push({ key: "blank", empty: true });
    }

    setDiaryList(diaryList);
  };

  useEffect(() => {
    checkDiaryListLength(Object.values(byIds));
  }, [byIds]);

  return (
    <View style={styles.container}>
      <DiaryList diaryList={diaryList} onPressDiary={handleSingleDiaryPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default DiaryListScreen;
