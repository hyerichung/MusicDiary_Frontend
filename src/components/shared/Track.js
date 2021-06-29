import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const Track = ({ track, onPress }) => {
  const { title, artist, albumImg } = track;
  const albumImage = albumImg[2].url;

  return (
    <View style={styles.trackWrapper}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.track}>
          <Image style={styles.albumImg} source={{ uri: albumImage }} />
          <View style={styles.trackDescription}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.artistText}>{artist}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  trackWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: "1%",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  trackDescription: {
    width: 240,
    marginLeft: 10,
    flexDirection: "column",
    marginBottom: 5,
  },
  titleText: {
    fontSize: 14,
  },
  artistText: {
    fontSize: 12,
    marginTop: "2%",
  },
  track: {
    width: 400,
    marginLeft: "1%",
    alignItems: "center",
    flexDirection: "row",
  },
  albumImg: {
    width: 50,
    height: 50,
  },
});

export default Track;
