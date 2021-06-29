import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DiaryCard from "./shared/DiaryCard";
import HomeDiaryListHeader from "./HomeDiaryListHeader";
import { useNavigation } from "@react-navigation/native";

const HomeDiaryList = ({ findMatchedDiary, allDiaryByIds }) => {
  const navigation = useNavigation();

  const [matchedDiaryList, setMatchedDiaryList] = useState([]);

  const getMatchedDiaryList = async () => {
    const diaryList = await findMatchedDiary(allDiaryByIds);
    setMatchedDiaryList(diaryList);
  };

  useEffect(() => {
    getMatchedDiaryList();
  }, [allDiaryByIds]);

  const handleViewAllButtonClick = () => {
    navigation.navigate("ViewAll");
  };

  return (
    <View style={styles.homeDiaryListWrapper}>
      <HomeDiaryListHeader
        matchedDiaryList={matchedDiaryList}
        onViewAllButtonClick={handleViewAllButtonClick}
      />
      {matchedDiaryList.length ? (
        <View style={styles.homeDiaryListBox}>
          <FlatList
            data={matchedDiaryList}
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
    height: "85%",
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
