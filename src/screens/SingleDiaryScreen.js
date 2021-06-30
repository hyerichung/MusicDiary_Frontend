import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import SingleDiary from "../components/SingleDiary";
import { listenMusic, setPlayList } from "../redux/slices/musicSlice";

const SingleDiaryScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { byIds } = useSelector((state) => state.diary);
  const { diary, newDiaryId } = route.params;

  const diaryId = newDiaryId ? newDiaryId : diary?._id;
  const { playList, date, address, hashTag } = byIds[diaryId];

  const energyScore = byIds[diaryId].energyScore;

  function handleTrackPress(index) {
    dispatch(setPlayList(byIds[diaryId]?.playList));
    dispatch(listenMusic(index));
  }

  return (
    <View style={styles.container}>
      <SingleDiary
        playList={playList}
        energyScore={energyScore}
        hashTag={hashTag}
        date={date}
        address={address}
        onTrackPress={handleTrackPress}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItem: "center",
    backgroundColor: "#ffffff",
  },
  searchButton: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
  modalWrapper: {
    backgroundColor: "#ffffff",
    flex: 1,
    height: "100%",
    width: "100%",
  },
  closeButton: {
    color: "black",
    position: "absolute",
    top: "50%",
  },
};

export default SingleDiaryScreen;
