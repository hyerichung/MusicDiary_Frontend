import React, { useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageBox from "./ImageBox";
import DiaryDescription from "./DiaryDescription";

const DiaryCard = ({ type, item }) => {
  const navigation = useNavigation();

  const moveToRelevantDiary = useCallback(
    (type, item) => {
      switch (type) {
        case "HomeDiary":
          return navigation.navigate("HomeDiaryDetail", { diary: item });
        case "AllDiaryList":
          return navigation.navigate("SingleDiaryDetail", { diary: item });
      }
    },
    [navigation]
  );

  const diaryDate = item?.date;
  const diaryHashTag = item?.hashTag;
  const playList = item?.playList;

  return (
    <View>
      <TouchableOpacity
        onPress={() => moveToRelevantDiary(type, item)}
        style={styles.cardBox}
      >
        <ImageBox playList={playList} />
        <DiaryDescription diaryDate={diaryDate} diaryHashTag={diaryHashTag} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    height: 180,
    width: 135,
    marginLeft: 8,
    marginRight: 5,
  },
});

export default DiaryCard;
