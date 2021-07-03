import { useState, useCallback } from "react";
import Geocoder from "react-native-geocoding";
import { API_GOOGLE_GEOCODING_KEY } from "@env";

import useCurrentGeoLocation from "./useCurrentGeoLocation";

const useCurrentAddress = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [geoLocation, setGeoLocation] = useState({});
  const { getCurrentGeoLocation } = useCurrentGeoLocation();

  const getCurrentAddress = useCallback(
    async (isCancelled) => {
      if (isCancelled) {
        return;
      }

      Geocoder.init(API_GOOGLE_GEOCODING_KEY, { language: "en" });

      const geoLocation = await getCurrentGeoLocation();

      const reversedGeoAddress = await Geocoder.from({
        lat: geoLocation?.coords?.latitude,
        lng: geoLocation?.coords?.longitude,
      });

      const currentAddress = reversedGeoAddress.results[1].formatted_address;
      setCurrentAddress(currentAddress);
      setGeoLocation(geoLocation);

      return { currentAddress, geoLocation };
    },
    [getCurrentGeoLocation]
  );

  return { geoLocation, currentAddress, getCurrentAddress };
};

export default useCurrentAddress;
