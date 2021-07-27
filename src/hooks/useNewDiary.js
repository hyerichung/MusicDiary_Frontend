import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

import useCurrentAddress from "./useCurrentAddress";
import { addNewDiary } from "../redux/slices/diarySlice";

const useNewDiary = (navigation) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);

  const [hashTag, setHashTagValue] = useState("");
  const { geoLocation, currentAddress, getCurrentAddress } =
    useCurrentAddress();

  const handleTextChange = useCallback(
    (value) => {
      if (hashTag.length > 15) {
        return;
      }

      setHashTagValue(value);
    },
    [hashTag.length]
  );

  useEffect(() => {
    let isCancelled = false;

    getCurrentAddress(isCancelled);

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleCloseButtonPress = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  const handleSubmitButtonPress = useCallback(async () => {
    const newDiaryInfo = {
      hashTag,
      address: currentAddress,
      geoLocation: {
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude,
      },
    };

    if (hashTag.length < 1) {
      showMessage({
        message: "Please type your hastag",
        type: "error",
        hideStatusBar: true,
        backgroundColor: "#A32700",
      });

      return;
    }
    const { payload } = await dispatch(addNewDiary({ newDiaryInfo, userId }));

    navigation.navigate("SingleDiaryDetail", {
      newDiaryId: payload.newDiary._id,
    });
  }, [currentAddress, userId, navigation, hashTag, dispatch, geoLocation]);

  return {
    handleCloseButtonPress,
    hashTag,
    handleTextChange,
    handleSubmitButtonPress,
    currentAddress,
    getCurrentAddress,
  };
};

export default useNewDiary;
