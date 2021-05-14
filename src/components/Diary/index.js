import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

const Diary = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContainer}>
        <Text>{data.id}</Text>
        <Text>{data.title}</Text>
        <Text>{data.hashTag}</Text>
        <Text>{data.location}</Text>
        <View style={styles.card}>
          <FlatList
            data={data}
            keyExtractor={(playList) => playList.id}
            renderItem={({ playList, idx }) => {
              return (
                <View>
                  <Text>playlist {playList.id}</Text>
                  <Text>playlist {playList.title}</Text>
                  <Text>playlist {playList.artist}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    alignSelf: "center",
    marginTop: 10,
    padding: 20,
    height: 80,
  },
  divider: {
    alignSelf: "center",
    width: "80%",
    height: 1,
  },
});

export default Diary;
