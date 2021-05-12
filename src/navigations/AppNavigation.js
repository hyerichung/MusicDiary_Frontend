import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { NavigationContainer } from "@react-navigation/native";
import { getAccessToken } from "../redux/slices/userSlice";
import Loading from "../screens/LoadingScreen/";
import AppStackNavigator from "../navigations/AppStackNavigator";

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAccessToken = async () => {
      try {
        const resultAction = await dispatch(getAccessToken());
        const accessToken = unwrapResult(resultAction);

        if (!accessToken) {
          console.warn("No token from secure store");
        }
      } catch (err) {
        console.error("failed to load accessToken from secure store", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAccessToken();
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
