import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryByDate } from "../../redux/slices/diarySlice";

const HomeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);

  const [shouldFetch, setShouldFetch] = useState(false);

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
  },[shouldFetch]);

  return (
    <View>
      <Button title="Home.. geolocation...searching..find diary.." />
    </View>
  );
};

export default HomeScreen;
