import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux";
import { listenMusic, setPlayList } from "../redux/slices/musicSlice";
import { addTrackToDiary } from "../redux/slices/diarySlice";
import CloseButton from "../components/shared/CloseButton";
import SearchInput from "../components/SearchTrackInput";
import TrackList from "../components/SearchTrackList";

const TrackSearchModalScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const userId = user.userInfo.id;
  const accessToken = user.accessToken;
  const { diary } = route.params;
  const diaryId = diary;

  function handleCloseButtonPress() {
    navigation.goBack();
  }

  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    fetchTracks(searchInput);
  }, [searchInput]);

  async function handleSelectSong(index) {
    await dispatch(setPlayList(searchList));
    await dispatch(listenMusic(index));
  }

  const handlePressAddToDiaryBtn = async (trackInfo) => {
    try {
      const energyResult = await fetch(
        `https://api.spotify.com/v1/audio-features/${trackInfo.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { energy } = await energyResult.json();
      const energyAddedTrackInfo = { ...trackInfo, energy, date: Date.now() };

      await dispatch(
        addTrackToDiary({
          accessToken,
          userId,
          diaryId,
          trackInfo: energyAddedTrackInfo,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTracks = debounce(async (searchInput) => {
    try {
      const tempSearchResult = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track%2Cartist&limit=40`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const resultList = await tempSearchResult.json();

      const result = resultList?.tracks?.items.map((list) => ({
        title: list.name,
        id: list.id,
        uri: list.uri,
        preview:
          list.preview_url ??
          "https://p.scdn.co/mp3-preview/bc5f3e28ba28c76b36f409d3c3f697e597b6ff6f?cid=41014a1f3ad143a8be14a47f025c209d",
        duration: list.duration_ms,
        artist: list.artists[0].name,
        albumImg: list.album.images,
      }));

      setSearchList(result);
    } catch (err) {
      console.error(err);
    }
  }, 800);

  const handleChangeText = (text) => {
    setSearchInput(text);
  };

  return (
    <View style={styles.searchTrackContainer}>
      <CloseButton
        style={styles.closeButton}
        onPress={handleCloseButtonPress}
      />
      <SearchInput
        onSearchInputChange={(text) => handleChangeText(text)}
        searchInput={searchInput}
      />
      <View style={styles.listWrapper}>
        {searchList?.length ? (
          <TrackList searchList={searchList} onTrackPress={handleSelectSong} />
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

export default TrackSearchModalScreen;
