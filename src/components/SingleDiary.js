import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import SingleDiaryHeader from "./SingleDiaryHeader";
import Track from "./shared/Track";

const SingleDiary = ({
  hashTag,
  date,
  address,
  energyScore,
  playList,
  onTrackPress,
}) => {
  return (
    <View stlye={styles.diaryContainer}>
      <SingleDiaryHeader
        hashTag={hashTag}
        date={date}
        address={address}
        energyScore={energyScore}
      />
      {playList?.length ? (
        <FlatList
          style={styles.playListContainer}
          disableVirtualization={false}
          data={playList}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            return <Track track={item} onPress={() => onTrackPress(index)} />;
          }}
        />
      ) : (
        <Text style={styles.defaultTrackText}>No track list</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  diaryContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  playListContainer: {
    height: "83%",
  },
  defaultTrackText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.6)",
  },
});

export default SingleDiary;
