import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const TrackDescription = ({ currentTrack }) => {
  return (
    <TouchableOpacity style={styles.trackDescription}>
      <Text numberOfLines={1} style={styles.trackTitle}>
        {currentTrack?.title ? currentTrack.title : "Music Diary"}
      </Text>
      <Text numberOfLines={1} style={styles.trackArtist}>
        {currentTrack?.artist ? currentTrack.artist : "Choose track"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trackDescription: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },
  trackTitle: {
    color: "black",
    fontSize: 16,
    paddingBottom: 4,
  },
  trackArtist: {
    color: "black",
    fontSize: 13,
  },
});

export default TrackDescription;
