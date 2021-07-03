import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useSelector, useDispatch } from "react-redux";
import { addNewDiary } from "../redux/slices/diarySlice";
import CloseButton from "../components/shared/CloseButton";
import LocationBox from "../components/NewDiaryLocationBox";
import SubmitButton from "../components/NewDiarySubmitButton";

import InputBar from "../components/NewDiaryInputBar";
import useCurrentAddress from "../hooks/useCurrentAddress";

const NewDiaryModalScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);

  const [hashTag, setHashTagValue] = useState("");
  const { geoLocation, currentAddress, getCurrentAddress } =
    useCurrentAddress();

  useEffect(() => {
    let isCancelled = false;

    getCurrentAddress(isCancelled);

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleChangeText = useCallback(
    (value) => {
      if (hashTag.length > 15) {
        return;
      }

      setHashTagValue(value);
    },
    [hashTag.length]
  );

  const handleCloseButtonPress = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  const handleSubmitButtonPress = useCallback(async () => {
    const newDiaryInfo = {
      hashTag,
      address: currentAddress,
      geoLocation: {
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude,
      },
    };

    if (hashTag.length < 1) {
      showMessage({
        message: "Please type your hastag",
        type: "error",
        hideStatusBar: true,
        backgroundColor: "#A32700",
      });

      return;
    }
    const { payload } = await dispatch(addNewDiary({ newDiaryInfo, userId }));

    navigation.navigate("SingleDiaryDetail", {
      newDiaryId: payload.newDiary._id,
    });
  }, [currentAddress, userId, navigation, hashTag, dispatch, geoLocation]);

  return (
    <TouchableOpacity
      style={styles.modalOverlay}
      onPress={handleCloseButtonPress}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modalWrapper}>
          <CloseButton
            style={styles.closeButton}
            onPress={handleCloseButtonPress}
          />
          <InputBar onChangeText={handleChangeText} hashTag={hashTag} />
          <LocationBox address={currentAddress} />
          <SubmitButton onPress={handleSubmitButtonPress} />
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalWrapper: {
    backgroundColor: "#1c1f28",
    flexDirection: "column",
    alignItems: "center",
    height: "30%",
    justifyContent: "center",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "33%",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "5%",
    width: "100%",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});

export default NewDiaryModalScreen;
