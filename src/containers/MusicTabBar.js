import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Audio } from "expo-av";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  setIsPlaying,
  goToNextTrack,
  goToPrevTrack,
} from "../redux/slices/musicSlice";
import { BOTTOM_TAB_ICON, PLAY_BUTTON_ICON } from "../constants";

const MusicTabBar = ({ state, descriptors, navigation }) => {
  const dispatch = useDispatch();
  const { isPlaying, playList, currentIdx } = useSelector(
    (state) => state.music
  );

  const currentTrack = playList[currentIdx];
  const [sound, setSound] = useState(null);

  useEffect(() => {
    async function checkMusicSound() {
      if (sound) {
        await sound.unloadAsync();
      }

      if (currentTrack?.preview) {
        createSound();
      }
    }
    checkMusicSound();
  }, [currentIdx, playList]);

  const controlMusicPlaying = async () => {
    if (isPlaying) {
      return await sound.pauseAsync();
    }

    await sound.playAsync();
  };

  const createSound = async () => {
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: currentTrack.preview },
      { shouldPlay: true },
      async (status) => {
        if (!status.isLoaded) {
          if (status.error) {
            console.error(`av error ${status.error}`);
          }
        } else {
          if (status.didJustFinish) {
            dispatch(goToNextTrack());
            return;
          }

          dispatch(setIsPlaying(status.isPlaying));
        }
      }
    );
    setSound(sound);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <View style={styles.trackPlayerContainer}>
        <View style={{ flexDirection: "row" }}>
          {currentTrack?.albumImg ? (
            <Image
              source={{ uri: currentTrack?.albumImg[2].url }}
              style={{
                width: currentTrack && 55,
                height: currentTrack && 55,
              }}
            />
          ) : (
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SimpleLineIcons name="music-tone" size={20} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 120,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: "black", fontSize: 16, paddingBottom: 4 }}
            >
              {currentTrack?.title ? currentTrack.title : "Music Diary"}
            </Text>
            <Text numberOfLines={1} style={{ color: "black", fontSize: 13 }}>
              <Text>
                {currentTrack?.artist ? currentTrack.artist : "Choose track"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ paddingLeft: 20 }}
            onPress={() => dispatch(goToPrevTrack())}
          >
            <SimpleLineIcons name={"control-start"} size={14} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ paddingLeft: 30 }}
            onPress={() => controlMusicPlaying()}
          >
            <SimpleLineIcons
              name={PLAY_BUTTON_ICON[isPlaying]}
              size={18}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ paddingLeft: 25 }}
            onPress={() => dispatch(goToNextTrack())}
          >
            <SimpleLineIcons name={"control-end"} size={14} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomTabBtnContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLable !== undefined
              ? options.tabBarLable
              : options.title !== undefined
                ? options.title
                : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              <SimpleLineIcons
                name={BOTTOM_TAB_ICON[label]}
                size={20}
                color={isFocused ? "#0652DD" : "black"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 0.6,
    width: "100%",
  },
  trackPlayerContainer: {
    flexDirection: "row",
    width: "100%",
    height: 55.3,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 35,
  },
  bottomTabBtnContainer: {
    flexDirection: "row",
    borderTopWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.2)",
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: "white",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default MusicTabBar;
