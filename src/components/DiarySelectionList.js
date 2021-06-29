import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DiarySelection from "../components/DiarySelection";

const DiarySelectionList = ({ diaryList }) => {
  return (
    <View style={styles.diarySelectionListWrapper}>
      {diaryList.length ? (
        <FlatList
          data={diaryList}
          keyExtractor={(list) => list._id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <DiarySelection item={item} />;
          }}
        />
      ) : (
        <View style={styles.defaultDiarySelectionListBox}>
          <Text style={styles.defaultDiarySelectionListText}>
            No Diaries Found 🔍
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  diarySelectionListWrapper: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
  },
  diarySelectionListBox: {
    height: "100%",
    backgroundColor: "red",
    marginBottom: 5,
  },
  defaultDiarySelectionListBox: {
    width: "100%",
    height: "85%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultDiarySelectionListText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: "10%",
  },
});

export default DiarySelectionList;
