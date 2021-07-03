import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchDiaries } from "../redux/slices/diarySlice";
import HomeDiaryList from "../components/HomeDiaryList";
import HomeIntro from "../components/HomeIntro";
import useMatchedDiary from "../hooks/useMatchedDiary";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user);
  const { byIds } = useSelector((state) => state?.diary);

  const userId = userInfo.id;

  const [shouldUpdateLocation, setShouldUpdateLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { matchedDiaries, currentAddress } = useMatchedDiary(
    shouldUpdateLocation,
    byIds
  );

  useFocusEffect(
    useCallback(() => {
      let isCancelled = false;

      (async function fetchdiariesByIds() {
        try {
          if (isCancelled) {
            return;
          }

          await dispatch(fetchDiaries({ userId }));
        } catch (err) {
          setErrorMsg(err.message);
        }
      })();

      return () => {
        isCancelled = true;
      };
    }, [userId, dispatch, shouldUpdateLocation])
  );

  const handleOnPressResearchingButton = useCallback(() => {
    setShouldUpdateLocation((prev) => !prev);
  }, []);

  return (
    <View style={styles.diaryListWrapper}>
      <HomeIntro
        userName={userInfo.userName}
        currentAddress={currentAddress}
        onRefreshButtonPress={handleOnPressResearchingButton}
      />
      <HomeDiaryList navigation={navigation} matchedDiaries={matchedDiaries} />
    </View>
  );
};

const styles = StyleSheet.create({
  diaryListWrapper: {
    flex: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#f4f7fa",
    alignItems: "center",
  },
});

export default HomeScreen;
