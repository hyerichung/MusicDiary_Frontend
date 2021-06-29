import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import DiaryCard from "./shared/DiaryCard";

const DiaryList = ({ diaryList }) => {
  const renderItem = ({ item }) => {
    if (item?.empty === true) {
      return <View style={styles.itemInvisible} />;
    }

    return <DiaryCard type="AllDiaryList" item={item} />;
  };

  return (
    <View style={styles.allDiaryListWrapper}>
      {diaryList.length ? (
        <FlatList
          data={diaryList}
          numColumns={2}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.allDiaryListColumn}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.defaultDiaryListWrapper}>
          <Text style={styles.defaultDiaryListText}>No Diaries Found 🔍</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  allDiaryListWrapper: {
    flex: 1,
  },
  defaultDiaryListWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultDiaryListText: {
    fontSize: 18,
    fontWeight: "500",
  },
  allDiaryListColumn: {
    flex: 1,
    justifyContent: "space-around",
    paddingVertical: "3%",
    paddingHorizontal: "7%",
  },
  itemInvisible: {
    backgroundColor: "transparent",
    borderWidth: 0,
    height: 180,
    width: 135,
    marginLeft: 8,
    marginRight: 5,
  },
});

export default DiaryList;
