import React from "react";
import { View, StyleSheet } from "react-native";

import AlbumImage from "./AlbumImage";
import TrackDescription from "./TrackDescription";
import MusicControlButton from "./MusicControlButton";

const MusicTabBar = ({
  currentTrack,
  onPressNextIcon,
  onPressPrevIcon,
  onPressControlIcon,
  isPlaying,
}) => {
  return (
    <View style={styles.musicPlayerContainer}>
      <AlbumImage currentTrack={currentTrack} />
      <TrackDescription currentTrack={currentTrack} />
      <MusicControlButton
        onPressNextIcon={onPressNextIcon}
        onPressPrevIcon={onPressPrevIcon}
        onPressControlIcon={onPressControlIcon}
        isPlaying={isPlaying}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  musicPlayerContainer: {
    flexDirection: "row",
    width: "100%",
    height: 55.3,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "8%",
  },
});

export default MusicTabBar;
