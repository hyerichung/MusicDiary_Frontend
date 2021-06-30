import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTrackToDiary } from "../redux/slices/diarySlice";
import DiarySelectionList from "../components/DiarySelectionList";
import CloseButton from "../components/shared/CloseButton";
import { showMessage } from "react-native-flash-message";

const DiarySelectionModalScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { byIds } = useSelector((state) => state.diary);
  const trackInfo = route.params.diary;

  const userId = user.userInfo.id;
  const accessToken = user.accessToken;

  const handleOverlayPress = () => {
    navigation.goBack();
  };

  const handleDiarySelectionPress = async (diaryId) => {
    try {
      const energyResult = await fetch(
        `https://api.spotify.com/v1/audio-features/${trackInfo.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { energy } = await energyResult.json();
      const energyAddedTrackInfo = { ...trackInfo, energy, date: Date.now() };

      await dispatch(
        addTrackToDiary({
          accessToken,
          userId,
          diaryId,
          trackInfo: energyAddedTrackInfo,
        })
      );

      showMessage({
        message: "Track added to diary Successfully",
        type: "info",
        hideStatusBar: true,
        backgroundColor: "#1c1f28",
      });

      navigation.goBack();
    } catch (err) {
      showMessage({
        message: "Failed to add track to diary, Please try again",
        type: "error",
        hideStatusBar: true,
        backgroundColor: "#A32700",
      });

      console.error(err);
    }
  };

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
    height: "45%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "33%",
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
