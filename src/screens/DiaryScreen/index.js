import React from "react";
import { View, Button } from "react-native";
import Diary from "../../components/Diary";

const DiaryScreen = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Diary data={data} />
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
