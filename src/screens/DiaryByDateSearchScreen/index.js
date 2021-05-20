import React from "react";
import { View, Button, StyleSheet, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import DiaryList from "../../components/DiaryList";
import { useIsFocused } from "@react-navigation/native";

const DiaryByDateSearchScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { byIds } = useSelector((state) => state.diary);

  if (isFocused) {
    console.log("focused by date?");
  }

  function handleDiaryPressBtn(diaryInfo) {
    navigation.navigate("SingleDiary", { data: diaryInfo });
  }

  return (
    <View style={styles.container}>
      <Button title="diary by dates..default..showing relevant diary with location.." />
      <DiaryList
        diaryList={Object.values(byIds)}
        onPressDiary={handleDiaryPressBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topTabHeader: {
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    backgroundColor: "purple",
    // backgroundColor: "yellow",
    // paddingTop: StatusBar.currentHeight,
    // height: 50,
    // flexDirection: "row",
    // alignItems: "center",
  },
});


export default DiaryByDateSearchScreen;
