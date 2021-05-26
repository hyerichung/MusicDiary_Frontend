import React, { useEffect, useState } from "react";
import { getDistance } from "geolib";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { fetchDiaryByDate } from "../../redux/slices/diarySlice";
import HomeDiaryAlert from "../../components/HomeDiaryAlert";
import LottieView from "lottie-react-native";

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
  const [historyDiary, setHistoryDiary] = useState({});
  const [errMessage, setErrorMsg] = useState("");

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
      <View style={styles.userIntroWrapper}>
        <LottieView
          source={require("../../../assets/animations/location_pin.json")}
          autoPlay
          style={{
            height: 70,
            width: 70,
            padding: 0,
            marginRight: 4,
            marginTop: 5,
          }}
          loop
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Hi, {userInfo.userName}</Text>
          <Text style={styles.desc}>Searching your diary within 50m...</Text>
        </View>
      </View>

      <HomeDiaryAlert
        navigation={navigation}
        matchedHistoryDiary={historyDiary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  withinText: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    width: 180,
    marginTop: 30,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
  },
  homeLocationLogo: {
    width: 100,
    height: 150,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  userIntroWrapper: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 15,
    width: 335,
    height: 100,
    justifyContent: "flex-start",
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  userInfo: {
    width: 260,
    justifyContent: "center",
  },
  userName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 24,
  },
  desc: {
    fontFamily: "DMSans_700Bold_Italic",
    fontSize: 15,
    color: "rgba(0, 0, 0, 0.8)",
  }
});

export default HomeScreen;
