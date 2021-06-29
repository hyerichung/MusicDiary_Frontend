import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const NewDiaryInputBar = ({ onChangeText, hashTag }) => {
  return (
    <View style={styles.inputBox}>
      <Fontisto
        style={styles.hashTag}
        name="hashtag"
        size={24}
        color="#ffffff"
      />
      <TextInput
        style={styles.input}
        placeholder="Type your HashTag"
        blurOnSubmit
        autoCorrect={false}
        maxLength={30}
        placeholderTextColor="#ffffff"
        fontWeight="800"
        color="#ffffff"
        fontSize="18"
        value={hashTag}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hashTag: {
    marginRight: 15,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  locationIcon: {
    marginRight: 10,
    color: "#ffffff",
  },
  input: {
    width: 200,
    height: 50,
    fontSize: 15,
    marginRight: 28,
    textAlign: "center",
    backgroundColor: "transparent",
  },
});

export default NewDiaryInputBar;
