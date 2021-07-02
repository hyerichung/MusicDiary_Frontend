import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DiarySelection = ({ onPress, item }) => {
  const diaryDate = item?.date;
  const diaryHashTag = item?.hashTag;

  return (
    <View style={styles.diarySelectionWrapper}>
      <TouchableOpacity
        style={styles.diarySelectionBox}
        onPress={() => onPress(item?._id)}
      >
        <View style={styles.hashTagBox}>
          <Text style={styles.hashTag}># {diaryHashTag}</Text>
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.date}>{diaryDate}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  diarySelectionWrapper: {
    alignItems: "center",
    height: 45,
    width: "100%",
    marginTop: "2%",
    backgroundColor: "#ffffff",
  },
  diarySelectionBox: {
    width: "90%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  hashTagBox: {
    width: "55%",
    flexDirection: "row",
    alignItems: "center",
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  hashTag: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
  },
  date: {
    fontSize: 10,
    color: "black",
    fontWeight: "500",
  },
});

export default DiarySelection;
