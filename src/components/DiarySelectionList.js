import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DiarySelection from "../components/DiarySelection";

const DiarySelectionList = ({ onDiarySelectionPress, diaryList }) => {
  return (
    <>
      {diaryList.length ? (
        <FlatList
          data={diaryList}
          style={styles.diarySelectionListBox}
          keyExtractor={(list) => list._id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <DiarySelection onPress={onDiarySelectionPress} item={item} />
            );
          }}
        />
      ) : (
        <View style={styles.defaultDiarySelectionListBox}>
          <Text style={styles.defaultDiarySelectionListText}>
            No Diaries Found 🔍
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  diarySelectionListBox: {
    width: "88%",
    height: "100%",
  },
  defaultDiarySelectionListBox: {
    width: "100%",
    height: "85%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultDiarySelectionListText: {
    marginBottom: "10%",
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
  },
});

export default DiarySelectionList;
