import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";

const DiaryList = ({ diaryList, onPressDiary }) => {
  return (
    <>
      <View>
        <FlatList
          data={diaryList}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item, idx }) => {
            return (
              <TouchableOpacity
                key={item._id}
                onPress={() => onPressDiary(item)}
              >
                <View>
                  <Text>{item.title}</Text>
                  <Text>{item.location}</Text>
                  <Text>{item.hashTag}</Text>
                  <Text>{item.date}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default DiaryList;
