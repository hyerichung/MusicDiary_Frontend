import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Audio, Video } from "expo-av";

const Diary = ({ data }) => {
  return (
    <View stlye={styles.diaryContainer}>
      <View style={styles.titleContainer}>
        <Text>{data.location}</Text>
        <Text># {data.hashTag}</Text>
        <Text>{data.date}</Text>
      </View>

      <View style={styles.playListContainer}>
        <FlatList
          numRows={data.playList.length}
          style={styles.playListContainer}
          data={data.playList}
          keyExtractor={(item) => item._id}
          renderItem={({ item, idx }) => {
            return (
              <View style={styles.trackContainer}>
                <Text>Playlist</Text>
                <Text>{item._id}</Text>
                <Text>{item.title}</Text>
                <Text>{item.artist}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  diaryContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  titleContainer: {
    height: "15%",
    backgroundColor: "purple",
  },
  playListContainer: {
    height: "40%",
    borderWidth: 1,
    backgroundColor: "yellow",
  },
  trackContainer: {
    borderWidth: 1,
    margin: 2,
    backgroundColor: "orange",
  },
});

export default Diary;
