import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { NavigationContainer } from "@react-navigation/native";
import {
  getAccessToken,
  clearUser,
  clearAccessToken,
} from "../redux/slices/userSlice";
import Loading from "../screens/LoadingScreen";
import AppStackNavigator from "../navigations/AppStackNavigator";

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(isLoading ? true : false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAccessToken = async () => {
      try {
        const resultAction = await dispatch(getAccessToken());
        const accessToken = unwrapResult(resultAction);

        if (!accessToken) {
          throw new Error("Invaild token in the secure store");
        }
      } catch (err) {
        dispatch(clearUser());
        await dispatch(clearAccessToken());
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
