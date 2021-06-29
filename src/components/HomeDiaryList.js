import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
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
      <View style={styles.homeDiaryListBox}>
        <FlatList
          data={matchedDiaryList}
          keyExtractor={(list) => list._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <DiaryCard navigation={navigation} type="HomeDiary" item={item} />
            );
          }}
        />
      </View>
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
    height: "85%",
  },
});

export default HomeDiaryList;
