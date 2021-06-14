import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MatchedDiaryByLocation from "../MatchedDiaryByLocation";

const HomeDiaryList = ({ navigation, findMatchedDiary, allDiaryByIds }) => {
  return (
    <View style={styles.diaryInfoBox}>
      <View style={styles.diaryLocationTitleBox}>
        <Text style={styles.diaryLocationTitle}>Diary within 50m</Text>
      </View>
      <MatchedDiaryByLocation
        navigation={navigation}
        findMatchedDiary={findMatchedDiary}
        allDiaryByIds={allDiaryByIds}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#f4f7fa",
    alignItems: "center",
  },
  withinText: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    width: 180,
    marginTop: 30,
    fontWeight: "200",
    color: "rgba(0, 0, 0, 0.6)",
  },
  userIntroWrapper: {
    flexDirection: "row",
    marginBottom: 15,
    height: 300,
    width: 375,
    backgroundColor: "#191919",
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  diaryLocationTitleBox: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  diaryLocationTitle: {
    marginLeft: 15,
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
    color: "black",
  },
  userInfo: {
    width: 330,
    justifyContent: "center",
  },
  userName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  desc: {
    fontFamily: "DMSans_700Bold_Italic",
    fontSize: 13,
    color: "#ffffff",
  },
  diaryInfoBox: {
    backgroundColor: "#ffffff",
    height: 245,
    width: "100%",
  },
});

export default HomeDiaryList;
