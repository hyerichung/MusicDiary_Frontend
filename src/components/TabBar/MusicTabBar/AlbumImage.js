import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MUSIC_TAB_ICON } from "../../../constants";

const AlbumImage = ({ currentTrack }) => {
  return (
    <View>
      {currentTrack?.albumImg ? (
        <Image
          source={{ uri: currentTrack?.albumImg[2].url }}
          style={styles.albumImage}
        />
      ) : (
        <TouchableOpacity style={styles.defaultAlbumIconWrapper}>
          <SimpleLineIcons
            name={MUSIC_TAB_ICON.DefaultAlbum}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultAlbumIconWrapper: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  albumDisplayingSection: {
    flexDirection: "row",
  },
  albumImage: {
    width: 55,
    height: 55,
  },
});

export default AlbumImage;
