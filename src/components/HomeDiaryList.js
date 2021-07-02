import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DiaryCard from "./shared/DiaryCard";
import HomeDiaryListHeader from "./HomeDiaryListHeader";

const HomeDiaryList = ({ navigation, matchedDiaries }) => {
  const handleViewAllButtonClick = () => {
    navigation.navigate("ViewAll");
  };

  return (
    <View style={styles.homeDiaryListWrapper}>
      <HomeDiaryListHeader
        matchedDiaryList={matchedDiaries}
        onViewAllButtonClick={handleViewAllButtonClick}
      />
      {matchedDiaries?.length ? (
        <View style={styles.homeDiaryListBox}>
          <FlatList
            data={matchedDiaries}
            keyExtractor={(list) => list._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <DiaryCard
                  navigation={navigation}
                  type="HomeDiary"
                  item={item}
                />
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.defaultDiaryListBox}>
          <Text style={styles.defaultDiaryListText}>No Diaries Found 🔍</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeDiaryListWrapper: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: "53%",
  },
  homeDiaryListBox: {
    height: "80%",
  },
  defaultDiaryListBox: {
    height: "80%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultDiaryListText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: "10%",
  },
});

export default HomeDiaryList;
