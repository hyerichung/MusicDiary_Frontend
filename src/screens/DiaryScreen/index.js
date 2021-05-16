import React from "react";
import { useSelector } from "react-redux";
import { View, Button } from "react-native";
import Diary from "../../components/Diary";

const DiaryScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const { byIds } = useSelector((state) => state.diary);

  const newDiaryInfo = byIds[data.newDiaryId];
  const diaryId = data.newDiaryId ? newDiaryInfo._id : data._id;

  function openNewTrackAddingModal() {
    navigation.navigate("addNewTrackModal", { data: diaryId });
  }

  function openDiaryEditingModal() {
    navigation.navigate("Modal", {
      screen: "editDiaryModal",
      params: { data: diaryId },
    });
  }

  return (
    <View style={styles.container}>
      <Diary data={data.newDiaryId ? newDiaryInfo : data} />
      <Button title="add track" onPress={openNewTrackAddingModal} />
      <Button title="edit diary" onPress={openDiaryEditingModal} />
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: "skyblue",
    flexDirection: "column",
  },
};

export default DiaryScreen;
