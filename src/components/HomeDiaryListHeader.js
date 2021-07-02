import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const HomeDiaryListHeader = ({ matchedDiaryList, onViewAllButtonClick }) => {
  return (
    <View style={styles.homeDiaryListTitleBox}>
      <Text style={styles.homeDiaryListTitle}>Diary within 50m</Text>
      {matchedDiaryList.length > 8 && (
        <TouchableOpacity onPress={onViewAllButtonClick}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeDiaryListTitleBox: {
    width: "95%",
    height: "15%",
    marginBottom: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeDiaryListTitle: {
    marginLeft: "5%",
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
    color: "black",
  },
  viewAllText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
    color: "#90929e",
  },
});

export default HomeDiaryListHeader;
