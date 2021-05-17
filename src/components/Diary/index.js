import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

const Diary = ({ data, diaryId }) => {
  const { byIds } = useSelector((state) => state.diary);

  return (
    <View stlye={styles.diaryContainer}>
      <View style={styles.titleContainer}>
        <Text>{byIds[diaryId]?.location}</Text>
        <Text># {byIds[diaryId]?.hashTag}</Text>
        <Text>{byIds[diaryId]?.date}</Text>
      </View>

      <View style={styles.playListContainer}>
        <FlatList
          numRows={byIds[diaryId]?.playList.length}
          style={styles.playListContainer}
          data={byIds[diaryId]?.playList}
          keyExtractor={(item) => String(Math.random() * 1000)}
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
    height: "10%",
    backgroundColor: "purple",
  },
  playListContainer: {
    height: "80%",
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
