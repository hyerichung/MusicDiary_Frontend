import React, { useEffect, useState, useRef } from "react";
import { View, Button, TextInput, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryByDate } from "../../redux/slices/diarySlice";
import { setNotificationToken } from "../../redux/slices/userSlice";

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
  const userId = userInfo.id;

  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    async function gettingToken() {
      const permissionToken = await registerForPushNotificationsAsync();

      dispatch(setNotificationToken(permissionToken));
    }

    gettingToken();
  }, []);

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

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const getDiaryByDate = async () => {
      await dispatch(fetchDiaryByDate({ userId }));
      setShouldFetch(false);
    };

    getDiaryByDate();
  }, [shouldFetch, dispatch]);

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
        onPress={() => sendNotification(permissionToken)}
      />
    </View>
  );
};

export default HomeScreen;
