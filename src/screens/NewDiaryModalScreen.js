import { API_GOOGLE_GEOCODING_KEY } from "@env";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addNewDiary } from "../redux/slices/diarySlice";
import CloseButton from "../components/shared/CloseButton";
import LocationBox from "../components/NewDiaryLocationBox";
import SubmitButton from "../components/NewDiarySubmitButton";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
import InputBar from "../components/NewDiaryInputBar";

const NewDiaryModalScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);

  const [address, setAddress] = useState(null);
  const [geoLocation, setGeoLocation] = useState({ lat: "", lng: "" });

  Geocoder.init(API_GOOGLE_GEOCODING_KEY, { language: "en" });

  async function getAddress(lat, lng) {
    const reversedGeoAddress = await Geocoder.from({
      lat: lat,
      lng: lng,
    });

    setAddress(reversedGeoAddress.results[1].formatted_address);
    setGeoLocation({ lat, lng });
  }

  useEffect(() => {
    async function getLocation() {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        getAddress(location.coords.latitude, location.coords.longitude);
      }
    }
    getLocation();
  }, []);

  const [hashTag, setHashTagValue] = useState("");

  const handleChangeText = (value) => {
    if (hashTag.length > 15) {
      return;
    }

    setHashTagValue(value);
  };

  function handleCloseButtonPress() {
    navigation.goBack();
  }

  async function handleSubmitButtonPress() {
    const newDiaryInfo = { hashTag, address, geoLocation };

    const { payload } = await dispatch(addNewDiary({ newDiaryInfo, userId }));

    navigation.navigate("SingleDiaryDetail", {
      newDiaryId: payload.newDiary._id,
    });
  }

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
          <LocationBox address={address} />
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
