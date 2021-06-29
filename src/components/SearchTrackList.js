import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import Track from "./shared/Track";
import { Ionicons } from "@expo/vector-icons";

const SearchTrackList = ({ onPressAddButton, searchList, onTrackPress }) => {
  return (
    <FlatList
      style={styles.searchList}
      data={searchList}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item, index }) => {
        return (
          <View>
            <Track track={item} onPress={() => onTrackPress(index)} />
            <TouchableOpacity
              style={styles.addTrackButton}
              onPress={() => onPressAddButton(item)}
            >
              <Ionicons name="add-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  serachList: {
    justifyContent: "center",
    flexDirection: "row",
  },
  addTrackButton: {
    position: "absolute",
    top: "35%",
    right: "5%",
  },
});

export default SearchTrackList;
