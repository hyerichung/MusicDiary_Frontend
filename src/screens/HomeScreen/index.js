import React, { useEffect, useState } from "react";
import { getDistance } from "geolib";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { fetchDiaryByDate } from "../../redux/slices/diarySlice";
import HomeDiaryAlert from "../../components/HomeDiaryAlert";

import styles from "./styles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user);
  const { byIds } = useSelector((state) => state?.diary);
  const userId = userInfo?.id;

  const [shouldFetch, setShouldFetch] = useState(false);

  const [locationText, setLocationText] = useState(null);
  const [historyDiary, setHistoryDiary] = useState({});
  const [errMessage, setErrorMsg] = useState("");

  let locationIndicationText = "Searching for your current location...";

  if (locationText) {
    locationIndicationText = "Found Diary nearby your location!";
  }

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    getDiaryByDate(location);
  }

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    getLocation();
  }, [shouldFetch, byIds, dispatch]);

  function findHistoryDiary(location) {
    const matchedHistoryDiary = Object.values(byIds).filter((diary) => {
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

    setHistoryDiary(matchedHistoryDiary[0]);

    return matchedHistoryDiary;
  }

  const getDiaryByDate = async (location) => {
    await dispatch(fetchDiaryByDate({ userId }));

    findHistoryDiary(location);
    setShouldFetch(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setShouldFetch(true);
    });

    return () => unsubscribe();
  }, [shouldFetch]);

  return (
    <View style={styles.container}>
      <Text>{locationIndicationText}</Text>
      <HomeDiaryAlert
        navigation={navigation}
        matchedHistoryDiary={historyDiary}
      />
    </View>
  );
};

export default HomeScreen;
