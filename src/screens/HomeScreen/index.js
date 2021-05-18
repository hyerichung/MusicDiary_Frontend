import React, { useEffect, useState } from "react";
import { getDistance } from "geolib";
import { View, Button, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryByDate } from "../../redux/slices/diarySlice";
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

  useEffect(() => {
    async function getToken() {
      const permissionToken = await registerForPushNotificationsAsync();

      dispatch(setNotificationToken(permissionToken));
    }
    getToken();
  }, []);

  let tempLocationText = "wating..";

  if (errorMsg) {
    tempLocationText = errorMsg;
  } else if (location) {
    tempLocationText = JSON.stringify(location);
  }

  async function sendNotification(permissionToken) {
    try {
      const message = {
        to: permissionToken,
        sound: "default",
        title: "Original Title",
        body: "this is testing",
        data: { someData: "test tset tstsetsetsetset" },
      };

      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  async function getToken() {
    const permissionToken = await registerForPushNotificationsAsync();

    dispatch(setNotificationToken(permissionToken));
    return true;
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
    navigation.navigate("PrivateDiary", {
      screen: "Diary",
      params: { data: findHistoryDiary() },
    });
  }

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    getLocation();
    getDiaryByDate();
    findHistoryDiary();
  }, [shouldFetch, dispatch]);

  function findHistoryDiary() {
    const matchedHistoryDiary = Object.values(byIds).filter((diary) => {
      const dis = getDistance(
        {
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
        },
        { latitude: diary?.geoLocation.lat, longitude: diary?.geoLocation.lng }
      );

      const distance = dis / 1000;

      return distance <= 0.5;
    })[0];
    return matchedHistoryDiary;
  }

  const getDiaryByDate = async () => {
    await dispatch(fetchDiaryByDate({ userId }));
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
      <Button
        title="noti test"
        // onPress={() => sendNotification(permissionToken)}
      />
      <Text>{tempLocationText}</Text>
      <View>
        <View>
          <Text>500m 이내에 등록한 다이어리가 있어요..</Text>
          <TouchableOpacity onPress={moveToRelevantDiary}>
            <View>
              <Text>{findHistoryDiary()?.hashTag}</Text>
              <Text>{findHistoryDiary()?.date}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
