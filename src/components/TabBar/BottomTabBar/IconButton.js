import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import { BOTTOM_TAB_ICON, BOTTOM_TAB_ICON_COLOR } from "../../../constants";

const IconButton = ({ onPress, label, isFocused }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <SimpleLineIcons
        name={BOTTOM_TAB_ICON[label]}
        size={20}
        color={
          isFocused
            ? BOTTOM_TAB_ICON_COLOR.Focused
            : BOTTOM_TAB_ICON_COLOR.Default
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default IconButton;
