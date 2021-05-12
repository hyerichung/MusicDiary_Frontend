import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const TabWrapper = ({ handleTabPress, text, isActive }) => {
  return (
    <TouchableOpacity style={styles.tab} onPress={handleTabPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default TabWrapper;
