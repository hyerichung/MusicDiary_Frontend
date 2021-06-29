import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const NewDiaryLocationBox = ({ address }) => {
  return (
    <View style={styles.locationBox}>
      <SimpleLineIcons
        style={styles.locationIcon}
        name="location-pin"
        size={25}
        color="black"
      />
      <View style={styles.locationText}>
        <Text style={styles.address} numberOfLines={2}>
          {address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  address: {
    color: "#ffffff",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  locationIcon: {
    marginRight: 10,
    color: "#ffffff",
  },
  locationText: {
    width: 240,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#ffffff",
  },
});

export default NewDiaryLocationBox;
