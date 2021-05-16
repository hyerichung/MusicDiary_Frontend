import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Audio } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import PrivateDiaryListNavigator from "./PrivateDiaryListNavigator";
import UserInfoScreen from "../screens/UserInfoScreen";
import { setIsPlaying, goToNextTrack } from "../redux/slices/musicSlice";
import { BOTTOM_TAB_ICON, PLAY_BUTTON_ICON } from "../constants";

const MainBottomTab = createBottomTabNavigator();

const MusicTabBar = ({ state, descriptors, navigation }) => {
  const dispatch = useDispatch();
  const { isPlaying, playList, currentIdx } = useSelector(
    (state) => state.music
  );

  const currentTrack = playList[currentIdx];
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (sound) {
      sound.unloadAsync();
    }

    createSound();
  }, [currentIdx]);

  const controlMusicPlaying = async () => {
    if (isPlaying) {
      return await sound.pauseAsync();
    }

    await sound.playAsync();
  };

  const createSound = async () => {
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: currentTrack?.preview },
      { shouldPlay: true },
      async status => {
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
          <TouchableOpacity>
            <SimpleLineIcons
              name="music-tone"
              size={23}
              color="black"
              style={{ position: "absolute", left: 20, top: 8 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 12,
              width: 220,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: "black", fontSize: 16, paddingBottom: 4 }}
            >
              track name
            </Text>
            <Text numberOfLines={1} style={{ color: "black", fontSize: 13 }}>
  
              <Text>artist name</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ paddingLeft: 20 }}
            onPress={controlMusicPlaying}
          >
            <SimpleLineIcons
              name={PLAY_BUTTON_ICON[isPlaying]}
              size={20}
              color="black"
            />
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
                color={isFocused ? "blue" : "black"}
              />
              <Text style={{ color: isFocused ? "blue" : "black" }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const MainBottomTabNavigator = () => {
  return (
    <MainBottomTab.Navigator
      backBehavior="initialRoute"
      tabBar={(props) => <MusicTabBar {...props} />}
    >
      <MainBottomTab.Screen name="Home" component={HomeScreen} />
      <MainBottomTab.Screen
        name="PrivateDiary"
        component={PrivateDiaryListNavigator}
      />
      <MainBottomTab.Screen name="My" component={UserInfoScreen} />
    </MainBottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
  divider: {
    backgroundColor: "black",
    height: 2,
    width: "100%",
  },
  trackPlayerContainer: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
  bottomTabBtnContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "black",
    paddingTop: 8,
    paddingBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default MainBottomTabNavigator;
