import React from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { listenMusic, setPlayList } from "../../redux/slices/musicSlice";

const Diary = ({ data, diaryId }) => {
  const dispatch = useDispatch();
  const { byIds } = useSelector((state) => state.diary);

  function handlePressMusicPlayBtn(index) {
    dispatch(setPlayList(byIds[diaryId].playList));
    dispatch(listenMusic(index));
  }

  return (
    <View stlye={styles.diaryContainer}>
      <View style={styles.titleContainer}>
        <Text>{byIds[diaryId]?.address}</Text>
        <Text># {byIds[diaryId]?.hashTag}</Text>
        <Text>{byIds[diaryId]?.date}</Text>
      </View>

      <View style={styles.playListContainer}>
        <FlatList
          numRows={byIds[diaryId]?.playList.length}
          style={styles.playListContainer}
          data={byIds[diaryId]?.playList}
          keyExtractor={(item) => String(Math.random() * 1000)}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.trackContainer}>
                <Text>Playlist</Text>
                <Text>{item._id}</Text>
                <Text>{item.title}</Text>
                <Text>{item.artist}</Text>
                <Button
                  title="play"
                  onPress={() => handlePressMusicPlayBtn(index)}
                />
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
    backgroundColor: "#ffffff",
  },
  titleContainer: {
    height: "10%",
    backgroundColor: "#ffffff",
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
