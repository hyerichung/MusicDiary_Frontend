import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const SearchTrackInput = ({ searchInput, onSearchInputChange }) => {
  return (
    <View style={styles.searchInputBox}>
      <TextInput
        style={styles.searchInput}
        placeholder="Serach track..."
        blurOnSubmit
        autoCorrect={false}
        maxLength={30}
        placeholderTextColor="#777"
        value={searchInput}
        onChangeText={onSearchInputChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputBox: {
    flexDirection: "row",
    justifyContent: "center",
    height: "6%",
    width: "70%",
    marginTop: "10%",
    marginBottom: "5%",
    borderRadius: 20,
  },
  searchInput: {
    textAlign: "center",
    borderWidth: 1,
    height: "100%",
    width: "100%",
  },
});

export default SearchTrackInput;
