import { API_GOOGLE_GEOCODING_KEY } from "@env";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Geocoder from "react-native-geocoding";
import { getDistance } from "geolib";
import * as Location from "expo-location";

import { fetchDiaryByDate } from "../../redux/slices/diarySlice";
import HomeDiaryList from "../../components/HomeDiaryList";
import HomeIntro from "../../components/HomeIntro";

import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user);
  const { byIds } = useSelector((state) => state?.diary);

  const userId = userInfo.id;

  const [currentAddress, setCurrentAddress] = useState("");
  const [errMessage, setErrorMsg] = useState("");

  useEffect(() => {
    fetchAllDiary();
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
    dispatch(fetchDiaryByDate({ userId }));

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
        onRefreshBtnPress={handleOnPressResearchingBtn}
      />
      <HomeDiaryList
        navigation={navigation}
        findMatchedDiary={findMatchedDiary}
        allDiaryByIds={byIds}
      />
    </View>
  );
};

export default HomeScreen;
