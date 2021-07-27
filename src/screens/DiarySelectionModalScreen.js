import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import DiarySelectionList from "../components/DiarySelectionList";
import CloseButton from "../components/shared/CloseButton";
import useDiarySelection from "../hooks/useDiarySelection";

const DiarySelectionModalScreen = ({ route, navigation }) => {
  const { byIds, handleOverlayPress, handleDiarySelectionPress } =
    useDiarySelection(route, navigation);

  return (
    <TouchableOpacity
      style={styles.diarySelectionWrapper}
      onPress={handleOverlayPress}
    >
      <TouchableWithoutFeedback>
        <View style={styles.diarySelectionBox}>
          <Text style={styles.diarySelectionTitle}>Add to Diary</Text>
          <CloseButton
            style={styles.closeButton}
            onPress={handleOverlayPress}
          />
          <DiarySelectionList
            onDiarySelectionPress={handleDiarySelectionPress}
            diaryList={Object.values(byIds)}
          />
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
    height: "48%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "33%",
    paddingBottom: "3%",
    backgroundColor: "#1c1f28",
  },
  diarySelectionTitle: {
    marginTop: "4%",
    marginBottom: "3%",
    fontSize: 18,
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
