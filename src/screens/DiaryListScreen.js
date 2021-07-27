import React from "react";
import { View, StyleSheet } from "react-native";
import DiaryList from "../components/DiaryList";

import useDiaryList from "../hooks/useDiaryList";

const DiaryListScreen = ({ navigation }) => {
  const { diaryList, handleSingleDiaryPress } = useDiaryList(navigation);

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
