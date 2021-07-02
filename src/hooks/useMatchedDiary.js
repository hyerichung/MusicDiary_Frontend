import { useState, useEffect, useCallback } from "react";
import { getDistance } from "geolib";

import useCurrentAddress from "./useCurrentAddress";

const useMatchedDiary = (shouldUpdateLocation, byIds) => {
  const [matchedDiaries, setMatchedDiaries] = useState([]);
  const [currentAddress, setCurrentAddress] = useState("");
  const { getCurrentAddress } = useCurrentAddress();

  useEffect(() => {
    getMatchedDiaryList(byIds);
  }, [byIds, shouldUpdateLocation, getMatchedDiaryList]);

  const getMatchedDiaryList = useCallback(
    async (byIds) => {
      const { currentAddress, geoLocation } = await getCurrentAddress();

      const matchedDiaryList = Object.values(byIds).filter((diary) => {
        const distance = getDistance(
          {
            latitude: geoLocation?.coords?.latitude,
            longitude: geoLocation?.coords?.longitude,
          },
          {
            latitude: diary?.geoLocation?.lat,
            longitude: diary?.geoLocation?.lng,
          }
        );

        const distanceMeter = distance / 1000;

        return distanceMeter <= 0.5;
      });

      setMatchedDiaries(matchedDiaryList);
      setCurrentAddress(currentAddress);
    },
    [getCurrentAddress]
  );

  return { matchedDiaries, currentAddress };
};

export default useMatchedDiary;
