import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Track from "./shared/Track";
import { AntDesign } from "@expo/vector-icons";

const SearchTrackList = ({ searchList, onTrackPress }) => {
  return (
    <FlatList
      style={styles.searchList}
      data={searchList}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item, index }) => {
        return (
          <View>
            <Track track={item} onPress={() => onTrackPress(index)} />
            <AntDesign style={styles.addTrackButton} name="hearto" size={18} />
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
    top: "40%",
    right: "5%",
  },
});

export default SearchTrackList;
