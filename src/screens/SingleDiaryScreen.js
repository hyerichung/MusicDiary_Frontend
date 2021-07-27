import React from "react";
import { View } from "react-native";
import SingleDiary from "../components/SingleDiary";
import useSingleDiary from "../hooks/useSingleDiary";

const SingleDiaryScreen = ({ route }) => {
  const { diaryInfo, handleTrackPress } = useSingleDiary(route);

  return (
    <View style={styles.container}>
      <SingleDiary
        playList={diaryInfo.playList}
        energyScore={diaryInfo.energyScore}
        hashTag={diaryInfo.hashTag}
        date={diaryInfo.date}
        address={diaryInfo.address}
        onTrackPress={handleTrackPress}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItem: "center",
    backgroundColor: "#ffffff",
  },
};

export default SingleDiaryScreen;
