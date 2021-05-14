import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import Diary from "../Diary";

const DiaryList = ({ onPressDiary }) => {
  // mock data
  const [diaryList, setDiaryList] = useState([
    {
      id: "1",
      title: "one",
      location: "korea",
      hashTag: "#cafe",
      playList: [
        { id: "zzz", title: "why", artist: "artist1" },
        { id: "aaaaaaa", title: "22212", artist: "artist2" },
        { id: "bbbbb", title: "33333", artist: "artist3" },
        { id: "cccccc", title: "4444", artist: "artist4" },
      ],
    },
    {
      id: "2",
      title: "one",
      location: "korea",
      hashTag: "#cafe",
      playList: [
        { id: "zzz", title: "why", artist: "artist1" },
        { id: "aaaaaaa", title: "22212", artist: "artist2" },
        { id: "bbbbb", title: "33333", artist: "artist3" },
        { id: "cccccc", title: "4444", artist: "artist4" },
      ],
    },
    {
      id: "3",
      title: "one",
      location: "korea",
      hashTag: "#cafe",
      playList: [
        { id: "zzz", title: "why", artist: "artist1" },
        { id: "aaaaaaa", title: "22212", artist: "artist2" },
        { id: "bbbbb", title: "33333", artist: "artist3" },
        { id: "cccccc", title: "4444", artist: "artist4" }
      ],
    }
  ]);

  return (
    <>
      <View>
        <FlatList
          data={diaryList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, idx }) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => onPressDiary(item)}
              >
                <Diary data={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default DiaryList;
