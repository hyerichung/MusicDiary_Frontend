import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { getTrackEnergyScoreAPI } from "../api";

import { addTrackToDiary } from "../redux/slices/diarySlice";

const useDiarySelection = (route, navigation) => {
  const dispatch = useDispatch();
  const { byIds } = useSelector((state) => state.diary);
  const user = useSelector((state) => state.user);

  const trackInfo = route.params.diary;
  const userId = user.userInfo.id;

  const handleOverlayPress = () => {
    navigation.popToTop();
  };

  const handleDiarySelectionPress = async (diaryId) => {
    try {
      const currentEnergy = byIds[diaryId].energyScore;
      const { energy } = await getTrackEnergyScoreAPI({
        trackId: trackInfo.id,
      });

      const energyAddedTrackInfo = { ...trackInfo, trackEnergy: energy };
      console.log(energyAddedTrackInfo, "@@@@");
      await dispatch(
        addTrackToDiary({
          userId,
          diaryId,
          currentEnergy,
          trackInfo: energyAddedTrackInfo,
        })
      );

      showMessage({
        message: "Track added to diary Successfully",
        type: "info",
        hideStatusBar: true,
        backgroundColor: "#1c1f28",
      });

      navigation.popToTop();
    } catch (err) {
      showMessage({
        message: "Failed to add track to diary, Please try again",
        type: "error",
        hideStatusBar: true,
        backgroundColor: "#A32700",
      });

      console.warn(err);
    }
  };

  return {
    byIds,
    handleOverlayPress,
    handleDiarySelectionPress,
  };
};

export default useDiarySelection;
