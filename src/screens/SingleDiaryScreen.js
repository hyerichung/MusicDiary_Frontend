import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import SingleDiary from "../components/SingleDiary";
import { listenMusic, setPlayList } from "../redux/slices/musicSlice";

const SingleDiaryScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { byIds } = useSelector((state) => state.diary);
  const { diary, newDiaryId } = route.params;

  const diaryId = newDiaryId ? newDiaryId : diary?._id;
  const [diaryInfo, setDiaryInfo] = useState({});

  useEffect(() => {
    if (byIds[diaryId]) {
      const { playList, date, address, hashTag, energyScore } = byIds[diaryId];
      setDiaryInfo({ playList, date, address, hashTag, energyScore });
    }
  }, [byIds, diaryId]);

  const handleTrackPress = useCallback(
    (index) => {
      dispatch(setPlayList(byIds[diaryId]?.playList));
      dispatch(listenMusic(index));
    },
    [byIds, diaryId, dispatch]
  );

  return (
    <View style={styles.container}>
      <SingleDiary
        playList={diaryInfo.playList}
        energyScore={diaryInfo.energyScore}
        hashTag={diaryInfo.hashTag}
        date={diaryInfo.date}
        address={diaryInfo.address}
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
