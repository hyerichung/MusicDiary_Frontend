import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const MusicTabBar = ({ currentTrack }) => {
  return (
    <View style={styles.trackPlayerContainer}>
      <View style={styles.albumDisplayingSection}>
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
  );
};

const styles = StyleSheet.create({
  container: {},
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 0.6,
    width: "100%",
  },
  albumDisplayingSection: {
    flexDirection: "row",
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
  
});

export default MusicTabBar;
