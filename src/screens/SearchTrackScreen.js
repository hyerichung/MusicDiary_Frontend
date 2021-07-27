import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { listenMusic, setPlayList } from "../redux/slices/musicSlice";
import SearchInput from "../components/SearchTrackInput";
import SearchTrackList from "../components/SearchTrackList";

import useSearchTrack from "../hooks/useSearchTrack";

const SearchTrackScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    searchInput,
    handleTextChange,
    searchList,
    handleAddTrackToDiaryButtonPress,
  } = useSearchTrack(navigation);

  const handleSelectSong = async (index) => {
    await dispatch(setPlayList(searchList));
    await dispatch(listenMusic(index));
  };

  return (
    <View style={styles.searchTrackContainer}>
      <SearchInput
        onSearchInputChange={(text) => handleTextChange(text)}
        searchInput={searchInput}
      />
      <View style={styles.listWrapper}>
        {searchList?.length ? (
          <SearchTrackList
            onPressAddButton={handleAddTrackToDiaryButtonPress}
            searchList={searchList}
            onTrackPress={handleSelectSong}
          />
        ) : (
          <Text style={styles.defaultSearchText}>No search Content</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchTrackContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
  },
  closeButton: {
    position: "absolute",
    top: "2%",
    right: "3%",
    color: "black",
  },
  listWrapper: {
    height: "82%",
    width: "100%",
  },
  defaultSearchText: {
    textAlign: "center",
    marginTop: 65,
  },
});

export default SearchTrackScreen;
