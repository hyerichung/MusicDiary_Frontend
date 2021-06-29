import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const SingleDiaryHeader = ({ energyScore, hashTag, date, address }) => {
  return (
    <View style={styles.singleDiaryHeaderWrapper}>
      <View style={styles.energyScoreWrapper}>
        <SimpleLineIcons name="energy" size={30} color="black" />
        <Text style={styles.energyText}>{energyScore}</Text>
      </View>
      <View style={styles.titleWrapper}>
        <View style={styles.title}>
          <Text style={styles.hashTag}># {hashTag}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.address} numberOfLines={3}>
          {address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  singleDiaryHeaderWrapper: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "3%",
  },
  energyScoreWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: "50%",
    marginLeft: "3%",
  },
  energyText: {
    marginLeft: "2%",
    fontSize: 20,
  },
  titleWrapper: {
    width: "75%",
    marginLeft: "2%",
    justifyContent: "center",
  },
  title: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: "60%",
    width: "100%",
  },
  hashTag: {
    fontSize: 25,
  },
  date: {
    fontSize: 10,
    marginLeft: "3%",
    marginBottom: "1.5%",
  },
  address: {
    fontSize: 13,
    marginTop: "2%",
    marginLeft: "3%",
    color: "#84817a",
  },
});

export default SingleDiaryHeader;
