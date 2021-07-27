import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import CloseButton from "../components/shared/CloseButton";
import LocationBox from "../components/NewDiaryLocationBox";
import SubmitButton from "../components/NewDiarySubmitButton";

import useNewDiary from "../hooks/useNewDiary";
import InputBar from "../components/NewDiaryInputBar";
import useCurrentAddress from "../hooks/useCurrentAddress";

const NewDiaryModalScreen = ({ navigation }) => {
  const { geoLocation, currentAddress, getCurrentAddress } =
    useCurrentAddress();

  const {
    handleCloseButtonPress,
    hashTag,
    handleTextChange,
    handleSubmitButtonPress,
  } = useNewDiary(navigation, currentAddress, geoLocation);

  useEffect(() => {
    let isCancelled = false;

    getCurrentAddress(isCancelled);

    return () => {
      isCancelled = true;
    };
  }, [getCurrentAddress]);

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
          <InputBar onChangeText={handleTextChange} hashTag={hashTag} />
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
