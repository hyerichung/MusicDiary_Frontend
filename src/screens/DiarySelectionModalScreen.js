import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DiarySelectionList from "../components/DiarySelectionList";
import CloseButton from "../components/shared/CloseButton";

import { showMessage } from "react-native-flash-message";

const DiarySelectionModalScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { byIds } = useSelector((state) => state.diary);

  const handleOverlayPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={styles.diarySelectionWrapper}
      onPress={handleOverlayPress}
    >
      <TouchableWithoutFeedback>
        <View style={styles.diarySelectionBox}>
          <Text style={styles.diarySelectionTitle}>💁‍♀️ Choose Diary to add</Text>
          <CloseButton
            style={styles.closeButton}
            onPress={handleOverlayPress}
          />
          <DiarySelectionList diaryList={Object.values(byIds)} />
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  diarySelectionWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
  },
  diarySelectionBox: {
    width: "95%",
    height: "65%",
    alignItems: "center",
    marginBottom: "33%",
    backgroundColor: "#1c1f28",
  },
  diarySelectionTitle: {
    marginTop: "5%",
    marginBottom: "5%",
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },
  closeButton: {
    position: "absolute",
    right: "4%",
    top: "3%",
  },
});

export default DiarySelectionModalScreen;
