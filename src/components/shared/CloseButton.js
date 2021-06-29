import React from "react";
import { AntDesign } from "@expo/vector-icons";

const CloseButton = ({ style, onPress }) => {
  return (
    <AntDesign
      style={style}
      name="close"
      size={24}
      color="#ffffff"
      onPress={onPress}
    />
  );
};

export default CloseButton;
