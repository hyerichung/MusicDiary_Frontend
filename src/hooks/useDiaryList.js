import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const useDiaryList = (navigation) => {
  const { byIds } = useSelector((state) => state.diary);

  const [diaryList, setDiaryList] = useState([]);

  const handleSingleDiaryPress = (diaryInfo) => {
    navigation.navigate("DiaryDetail", { diary: diaryInfo });
  };

  const checkDiaryListLength = (diaryList) => {
    if (diaryList.length % 2 !== 0) {
      diaryList.push({ key: "blank", empty: true });
    }

    setDiaryList(diaryList);
  };

  useEffect(() => {
    checkDiaryListLength(Object.values(byIds));
  }, [byIds]);

  return { diaryList, handleSingleDiaryPress };
};

export default useDiaryList;
