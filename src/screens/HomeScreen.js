import React from "react";
import { View, StyleSheet } from "react-native";

import HomeDiaryList from "../components/HomeDiaryList";
import HomeIntro from "../components/HomeIntro";
import useFetchDiariesByIds from "../hooks/useFetchDiariesByIds";
import useMatchedDiary from "../hooks/useMatchedDiary";

const HomeScreen = ({ navigation }) => {
  const {
    byIds,
    userName,
    handleOnPressResearchingButton,
    shouldUpdateLocation,
  } = useFetchDiariesByIds();
  const { matchedDiaries, currentAddress } = useMatchedDiary(
    shouldUpdateLocation,
    byIds
  );

  return (
    <View style={styles.diaryListWrapper}>
      <HomeIntro
        userName={userName}
        currentAddress={currentAddress}
        onRefreshButtonPress={handleOnPressResearchingButton}
      />
      <HomeDiaryList navigation={navigation} matchedDiaries={matchedDiaries} />
    </View>
  );
};

const styles = StyleSheet.create({
  diaryListWrapper: {
    flex: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#f4f7fa",
    alignItems: "center",
  },
});

export default HomeScreen;
