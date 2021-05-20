import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const HomeDiaryAlert = ({ matchedHistoryDiary, navigation }) => {
  function moveToRelevantDiary() {
    navigation.navigate("Diary", {
      screen: "SingleDiary",
      params: { data: matchedHistoryDiary },
    });
  }

  return (
    <TouchableOpacity onPress={moveToRelevantDiary}>
      <View stlye={styles.diaryContainer}>
        <Text>
          {matchedHistoryDiary?.hashTag
            ? matchedHistoryDiary.hashTag
            : "No diary Found!"}
        </Text>
        <Text>
          {matchedHistoryDiary?.date
            ? matchedHistoryDiary.date
            : "No diary Found!"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  diaryContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  titleContainer: {
    height: "10%",
    backgroundColor: "purple",
  },
  playListContainer: {
    height: "80%",
    borderWidth: 1,
    backgroundColor: "yellow",
  },
  trackContainer: {
    borderWidth: 1,
    margin: 2,
    backgroundColor: "orange",
  },
});

export default HomeDiaryAlert;
