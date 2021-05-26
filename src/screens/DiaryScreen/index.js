import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Diary from "../../components/Diary";

const DiaryScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const { byIds } = useSelector((state) => state.diary);

  const newDiaryInfo = byIds[data.newDiaryId];
  const diaryId = data.newDiaryId ? newDiaryInfo?._id : data?._id;

  function openNewTrackAddingModal() {
    navigation.navigate("addNewTrackModal", { data: diaryId });
  }

  return (
    <View style={styles.container}>
      <Diary data={data.newDiaryId ? newDiaryInfo : data} diaryId={diaryId} />
      <View style={styles.btnWrap}>
        <TouchableOpacity
          style={styles.addTrackBtn}
          onPress={openNewTrackAddingModal}
        >
          <Text style={styles.addBtnText}>Add Track!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  addTrackBtn: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItem: "center",
    borderWidth: 1.5,
    borderColor: "#0652DD",
    borderRadius: "100%",
    backgroundColor: "#ffffff",
  },
  addBtnText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "black",
  },
  btnWrap: {
    flexDirection: "row",
    width: 360,
    justifyContent: "flex-end",
    marginTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItem: "center",
    backgroundColor: "#ffffff",
  },
};

export default DiaryScreen;
