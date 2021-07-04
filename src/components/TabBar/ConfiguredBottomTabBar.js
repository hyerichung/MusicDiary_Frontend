import React, { useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";

import {
  setIsPlaying,
  goToNextTrack,
  goToPrevTrack,
} from "../../redux/slices/musicSlice";
import BottomTabBar from "./BottomTabBar";
import MusicTabBar from "./MusicTabBar";

const ConfiguredBottomTabBar = ({ state, navigation }) => {
  const dispatch = useDispatch();
  const { isPlaying, playList, currentIdx } = useSelector(
    (state) => state?.music
  );

  const soundRef = useRef(null);
  const idRef = useRef(null);

  const currentTrack = playList[currentIdx];

  useFocusEffect(
    useCallback(() => {
      let isCancelled = false;

      async function checkMusicSound() {
        if (isCancelled) {
          if (soundRef.current) {
            await soundRef.current.pauseAsync();
            await soundRef.current.stopAsync();
          }
          soundRef.current = null;
          return;
        }

        if (soundRef?.current && idRef?.current !== currentTrack?._id) {
          await soundRef?.current?.unloadAsync();
        }

        if (
          !soundRef?.current?.isLoaded &&
          currentTrack?.preview &&
          idRef?.current !== currentTrack?._id
        ) {
          /*TO-DO
            : handling duplicated song playing
              when searchTrack clicked while soundRef.current playing
          */
          createSound();
        }
      }

      checkMusicSound();

      return () => (isCancelled = true);
    }, [currentTrack])
  );

  const handlePressContolIcon = async () => {
    if (isPlaying) {
      return await soundRef.current.pauseAsync();
    }

    await soundRef.current.playAsync();
  };

  const handlePressPrevIcon = () => {
    dispatch(goToPrevTrack());
  };

  const handlePressNextIcon = () => {
    dispatch(goToNextTrack());
  };

  const createSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: currentTrack.preview },
      { shouldPlay: true },
      async (status) => {
        if (!status.isLoaded) {
          if (status.error) {
            console.error(`error: ${status.error}`);
          }
        } else {
          if (status.didJustFinish) {
            await soundRef?.current?.unloadAsync();
            dispatch(goToNextTrack());
            return;
          }

          dispatch(setIsPlaying(status.isPlaying));
        }
      }
    );

    soundRef.current = sound;
    idRef.current = currentTrack._id;
  }, [currentTrack, dispatch]);

  return (
    <View>
      <View style={styles.topSeperateLine} />
      <MusicTabBar
        currentTrack={currentTrack}
        goToNextTrack={goToNextTrack}
        onPressPrevIcon={handlePressPrevIcon}
        onPressNextIcon={handlePressNextIcon}
        isPlaying={isPlaying}
        onPressControlIcon={handlePressContolIcon}
      />
      <BottomTabBar state={state} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  topSeperateLine: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 0.6,
    width: "100%",
  },
});

export default ConfiguredBottomTabBar;
