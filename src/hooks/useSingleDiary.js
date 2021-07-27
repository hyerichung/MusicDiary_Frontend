import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenMusic, setPlayList } from "../redux/slices/musicSlice";

const useSingleDiary = (route) => {
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

  return { diaryInfo, handleTrackPress };
};

export default useSingleDiary;
