import React, { useEffect } from "react";
import { View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryByDate } from "../../redux/slices/diarySlice";

const HomeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch(dispatch);
  const userId = useSelector((state) => state.user.userInfo.id);

  useEffect(() => {
    // initial diary fetching
    dispatch(fetchDiaryByDate({ userId }));
  }, [dispatch, userId]);

  return (
    <View>
      <Button title="Home.. geolocation...searching..find diary.." />
    </View>
  );
};

export default HomeScreen;
