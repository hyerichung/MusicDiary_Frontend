import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import { MUSIC_TAB_ICON, PLAY_BUTTON_ICON } from "../../../constants";

const MusicControlButton = ({
  onPressNextIcon,
  onPressPrevIcon,
  onPressControlIcon,
  isPlaying,
}) => {
  return (
    <View style={styles.playerBtnSection}>
      <TouchableOpacity
        style={styles.prevIconWrapper}
        onPress={onPressPrevIcon}
      >
        <SimpleLineIcons name={MUSIC_TAB_ICON.Prev} size={14} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.controlIconWrapper}
        onPress={onPressControlIcon}
      >
        <SimpleLineIcons
          name={PLAY_BUTTON_ICON[isPlaying]}
          size={18}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextIconWrapper}
        onPress={onPressNextIcon}
      >
        <SimpleLineIcons name={MUSIC_TAB_ICON.Next} size={14} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playerBtnSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  prevIconWrapper: {
    paddingLeft: 20,
  },
  nextIconWrapper: {
    paddingLeft: 25,
  },
  controlIconWrapper: {
    paddingLeft: 30,
  },
});

export default MusicControlButton;
