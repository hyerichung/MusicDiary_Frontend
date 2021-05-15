import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Button } from "react-native";
import Diary from "../../components/Diary";

const DiaryScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const { byIds } = useSelector((state) => state.diary);

  const newDiaryInfo = byIds[data.newDiaryId];

  return (
    <View style={styles.container}>
      <Diary data={data.newDiaryId ? newDiaryInfo : data} />
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: "skyblue",
    flexDirection: "column",
    flex: 1,
  },
};

export default DiaryScreen;
