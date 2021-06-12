import { API_GOOGLE_GEOCODING_KEY } from "@env";
import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Geocoder from "react-native-geocoding";
import { getDistance } from "geolib";
import * as Location from "expo-location";

import { fetchDiaryByDate } from "../../redux/slices/diarySlice";
import MatchedDiaryByLocation from "../../components/MatchedDiaryByLocation";
import HomeIntro from "../../components/HomeIntro";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user);
  const { byIds } = useSelector((state) => state?.diary);

  const userId = userInfo?.id;

  const [currentAddress, setCurrentAddress] = useState("");
  const [errMessage, setErrorMsg] = useState("");

  useEffect(() => {
    fetchAllDiaryByIds();
  }, []);

  const getMatchedDiary = async (byIds) => {
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

  async function fetchAllDiaryByIds() {
    await dispatch(fetchDiaryByDate({ userId }));
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

  async function handleOnPressResearchingBtn() {
    await dispatch(fetchDiaryByDate({ userId }));
  }

  return (
    <View style={styles.container}>
      <HomeIntro userName={userInfo.userName} currentAddress={currentAddress} />
      <View style={styles.diaryInfoBox}>
        <View style={styles.diaryLocationTitleBox}>
          <Text style={styles.diaryLocationTitle}>Diary within 50m</Text>
          <Button title="researching" onPress={handleOnPressResearchingBtn} />
        </View>

        <MatchedDiaryByLocation
          navigation={navigation}
          getMatchedDiary={getMatchedDiary}
          allDiaryByIds={byIds}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#f4f7fa",
    alignItems: "center",
  },
  withinText: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    width: 180,
    marginTop: 30,
    fontWeight: "200",
    color: "rgba(0, 0, 0, 0.6)",
  },
  userIntroWrapper: {
    flexDirection: "row",
    marginBottom: 15,
    height: 300,
    width: 375,
    backgroundColor: "#191919",
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  diaryLocationTitleBox: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  diaryLocationTitle: {
    marginLeft: 10,
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
    color: "black",
  },
  userInfo: {
    width: 330,
    justifyContent: "center",
  },
  userName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  desc: {
    fontFamily: "DMSans_700Bold_Italic",
    fontSize: 13,
    color: "#ffffff",
  },
  diaryInfoBox: {
    backgroundColor: "#ffffff",
    height: 245,
    width: "100%",
  },
});

export default HomeScreen;
