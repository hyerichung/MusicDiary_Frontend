import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DiarySelection = ({ item }) => {
  const diaryDate = item?.date;
  const diaryHashTag = item?.hashTag;

  return (
    <View style={styles.diarySelectionWrapper}>
      <TouchableOpacity style={styles.diarySelectionBox}>
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
    marginTop: 5,
    marginBottom: 5,
  },
  diarySelectionBox: {
    width: "80%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "10%",
    borderRadius: 5,
    backgroundColor: "#05F8CF",
  },
  hashTagBox: {
    width: "40%",
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
