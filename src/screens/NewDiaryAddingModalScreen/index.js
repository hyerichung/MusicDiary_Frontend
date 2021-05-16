import React, { useState } from "react";
import { View, Button, StyleSheet, StatusBar, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addNewDiary } from "../../redux/slices/diarySlice";

import { useIsFocused } from "@react-navigation/native";

const NewDiaryAddingModalScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);

  if (isFocused) {
    console.log("modal foucsed?");
  }

  const [diaryTitleInfo, setDiaryTitleInfo] = useState({
    hashTag: "",
    location: "",
  });

  const handleChangeText = (key, val) => {
    setDiaryTitleInfo({ ...diaryTitleInfo, [key]: val });
  };

  function closeModal() {
    navigation.goBack();
  }

  async function handlePressAddNewDiaryBtn() {
    const { payload } = await dispatch(addNewDiary({ diaryTitleInfo, userId }));

    navigation.navigate("Main", {
      screen: "PrivateDiary",
      params: {
        screen: "Diary",
        params: { data: { newDiaryId: payload._id } },
      },
    });
  }

  return (
    <View>
      <Button onPress={closeModal} title="Close" />
      <Button title="Submit" onPress={handlePressAddNewDiaryBtn} />
      <TextInput
        style={styles.input}
        placeholder="hash..."
        blurOnSubmit
        autoCorrect={false}
        maxLength={30}
        placeholderTextColor="#777"
        value={diaryTitleInfo.hashTag}
        onChangeText={(text) => handleChangeText("hashTag", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="location..."
        blurOnSubmit
        autoCorrect={false}
        maxLength={30}
        placeholderTextColor="#777"
        value={diaryTitleInfo.loaction}
        onChangeText={(text) => handleChangeText("location", text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    paddingTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default NewDiaryAddingModalScreen;
