import { useState } from "react";
import * as Location from "expo-location";

const useCurrentGeoLocation = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [geoLocation, setGeoLocation] = useState({});

  const getCurrentGeoLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const geoLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    setGeoLocation(geoLocation);

    return geoLocation;
  };

  return { geoLocation, getCurrentGeoLocation, errorMsg };
};

export default useCurrentGeoLocation;
