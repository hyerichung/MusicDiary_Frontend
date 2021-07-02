import { useState } from "react";
import { API_GOOGLE_GEOCODING_KEY } from "@env";
import Geocoder from "react-native-geocoding";

import useCurrentGeoLocation from "./useCurrentGeoLocation";

const useCurrentAddress = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const { getCurrentGeoLocation } = useCurrentGeoLocation();

  const getCurrentAddress = async () => {
    Geocoder.init(API_GOOGLE_GEOCODING_KEY, { language: "en" });

    const geoLocation = await getCurrentGeoLocation();

    const reversedGeoAddress = await Geocoder.from({
      lat: geoLocation?.coords?.latitude,
      lng: geoLocation?.coords?.longitude,
    });

    const currentAddress = reversedGeoAddress.results[1].formatted_address;
    setCurrentAddress(currentAddress);

    return { currentAddress, geoLocation };
  };

  return { currentAddress, getCurrentAddress };
};

export default useCurrentAddress;
