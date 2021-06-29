import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const LabelButton = ({ onPress, label, isFocused }) => {
  return (
    <TouchableOpacity
      isFocused={isFocused}
      onPress={onPress}
      style={styles.option}
    >
      <Text style={styles.labelText} isFocused={isFocused}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    marginLeft: "15%",
  },
  labelText: {
    fontSize: 15,
    fontWeight: "600",
  },
});

export default LabelButton;
