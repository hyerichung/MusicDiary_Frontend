import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDiaries } from "../redux/slices/diarySlice";

const useFetchDiariesByIds = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user);
  const { byIds } = useSelector((state) => state?.diary);

  const [shouldUpdateLocation, setShouldUpdateLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const userId = userInfo.id;
  const userName = userInfo.userName;

  const handleOnPressResearchingButton = useCallback(() => {
    setShouldUpdateLocation((prev) => !prev);
  }, []);

  useEffect(() => {
    (async function fetchdiariesByIds() {
      try {
        await dispatch(fetchDiaries({ userId }));
      } catch (err) {
        setErrorMsg(err.message);
      }
    })();
  }, [dispatch, shouldUpdateLocation]);

  return {
    byIds,
    userName,
    handleOnPressResearchingButton,
    shouldUpdateLocation,
    errorMsg,
  };
};

export default useFetchDiariesByIds;
