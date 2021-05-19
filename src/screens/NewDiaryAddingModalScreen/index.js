import { API_GOOGLE_GEOCODING_KEY } from "@env";
import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addNewDiary } from "../../redux/slices/diarySlice";
import { useIsFocused } from "@react-navigation/native";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";

const NewDiaryAddingModalScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);

  const [address, setAddress] = useState(null);
  const [geoLocation, setGeoLocation] = useState({ lat: "", lng: "" });

  Geocoder.init(API_GOOGLE_GEOCODING_KEY, { language: "ko" });

  async function getAddress(lat, lng) {
    const reversedGeoAddress = await Geocoder.from({
      lat: lat,
      lng: lng,
    });
    setAddress(reversedGeoAddress.results[3].formatted_address);
    setGeoLocation({ lat, lng });
  }

  if (isFocused) {
    console.log("modal foucsed?");
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

  const [diaryTitleInfo, setDiaryTitleInfo] = useState({
    hashTag: "",
  });

  const handleChangeText = (key, val) => {
    setDiaryTitleInfo({ ...diaryTitleInfo, [key]: val });
  };

  function closeModal() {
    navigation.goBack();
  }

  async function handlePressAddNewDiaryBtn() {
    const newDiaryInfo = { ...diaryTitleInfo, address, geoLocation};
    const { payload } = await dispatch(addNewDiary({ newDiaryInfo, userId }));

    navigation.navigate("Main", {
      screen: "Diary",
      params: {
        screen: "SingleDiary",
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
        value={diaryTitleInfo?.hashTag}
        onChangeText={(text) => handleChangeText("hashTag", text)}
      />
      <Text>current location: {address}</Text>
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
