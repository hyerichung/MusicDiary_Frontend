import React, { useEffect, useState } from "react";
import { getDistance } from "geolib";
import { View, Button, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryByDate, updateMatchedHistoryDiary } from "../../redux/slices/diarySlice";
import { setNotificationToken } from "../../redux/slices/userSlice";
import * as Location from "expo-location";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userInfo, permissionToken } = useSelector((state) => state.user);
  const { byIds } = useSelector((state) => state.diary);
  const userId = userInfo.id;

  const [shouldFetch, setShouldFetch] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [historyDiary, setHistoryDiary] = useState({});

  let tempLocationText = "wating..";

  if (errorMsg) {
    tempLocationText = errorMsg;
  } else if (location) {
    tempLocationText = JSON.stringify(location);
  }

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  function moveToRelevantDiary() {
    navigation.navigate("Diary", {
      screen: "SingleDiary",
      params: { data: byIds[historyDiary] },
    });
  }

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    getLocation();
    getDiaryByDate();
    findHistoryDiary();

    // return () => dispatch(updateMatchedHistoryDiary(historyDiary));
  }, [shouldFetch, dispatch]);


  function findHistoryDiary() {
    const matchedHistoryDiary = Object.values(byIds).filter((diary) => {
      const dis = getDistance(
        {
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
        },
        {
          latitude: diary?.geoLocation?.lat,
          longitude: diary?.geoLocation?.lng,
        }
      );

      const distance = dis / 1000;

      return distance <= 0.5;
    })[0];

    setHistoryDiary(matchedHistoryDiary?._id);
  };


  const getDiaryByDate = async () => {
    await dispatch(fetchDiaryByDate({ userId }));
    findHistoryDiary();
    setShouldFetch(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setShouldFetch(true);
    });

    return () => unsubscribe();
  }, [shouldFetch]);

  return (
    <View>
      <Button title="Home.. geolocation...searching..find diary.." />
      <Button title="noti test" />
      <Text>{tempLocationText}</Text>
      <View>
        <View>
          <Text>500m 이내에 등록한 다이어리가 있어요..</Text>
          <TouchableOpacity onPress={moveToRelevantDiary}>
            <View>
              <Text>{byIds[historyDiary]?.hashTag}</Text>
              <Text>{byIds[historyDiary]?.date}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
