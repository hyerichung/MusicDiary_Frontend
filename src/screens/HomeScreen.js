import React, { useEffect, useState } from "react";
import { fetchDiaries } from "../redux/slices/diarySlice";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { API_GOOGLE_GEOCODING_KEY } from "@env";
import Geocoder from "react-native-geocoding";
import { getDistance } from "geolib";
import * as Location from "expo-location";

import HomeDiaryList from "../components/HomeDiaryList";
import HomeIntro from "../components/HomeIntro";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#f4f7fa",
    alignItems: "center",
  },
});

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user);
  const { byIds } = useSelector((state) => state?.diary);

  const userId = userInfo.id;

  const [currentAddress, setCurrentAddress] = useState("");
  const [errMessage, setErrorMsg] = useState("");

  useEffect(() => {
    fetchAllDiary();
    console.log("am i passing here");
  }, [dispatch, userId]);

  const findMatchedDiary = async (byIds) => {
    const location = await getLocation();

    const matchedDiary = Object.values(byIds).filter((diary) => {
      const distance = getDistance(
        {
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
        },
        {
          latitude: diary?.geoLocation?.lat,
          longitude: diary?.geoLocation?.lng,
        }
      );

      const distanceMeter = distance / 1000;

      return distanceMeter <= 0.5;
    });

    return matchedDiary;
  };

  function fetchAllDiary() {
    dispatch(fetchDiaries({ userId }));
  }

  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    Geocoder.init(API_GOOGLE_GEOCODING_KEY, { language: "en" });

    const reversedGeoAddress = await Geocoder.from({
      lat: location?.coords?.latitude,
      lng: location?.coords?.longitude,
    });

    setCurrentAddress(reversedGeoAddress.results[1].formatted_address);

    return location;
  }

  function handleOnPressResearchingBtn() {
    fetchAllDiary();
  }

  return (
    <View style={styles.container}>
      <HomeIntro
        userName={userInfo.userName}
        currentAddress={currentAddress}
        onRefreshButtonPress={handleOnPressResearchingBtn}
      />
      <HomeDiaryList
        navigation={navigation}
        findMatchedDiary={findMatchedDiary}
        allDiaryByIds={byIds}
      />
    </View>
  );
}

export default HomeScreen;
