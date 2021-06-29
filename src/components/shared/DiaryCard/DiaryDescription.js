import React from "react";
import { StyleSheet, View, Text } from "react-native";

const DiaryDescription = ({ diaryDate, diaryHashTag }) => {
  return (
    <View>
      <View style={styles.hashTagWrapper}>
        <Text style={styles.hashTagText}># {diaryHashTag}</Text>
      </View>
      <View style={styles.dateWrapper}>
        <Text style={styles.dateText}>{diaryDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hashTagWrapper: {
    width: "95%",
    height: "17%",
    alignItems: "center",
    marginTop: "5%",
    color: "black",
  },
  hashTagText: {
    width: "90%",
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  dateWrapper: {
    width: "100%",
    height: "27%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: "2%",
    marginTop: "3%",
  },
  dateText: {
    height: "60%",
    alignItems: "flex-start",
    marginLeft: "4%",
    fontSize: 10,
    fontWeight: "700",
    color: "black",
  },
});

export default DiaryDescription;
