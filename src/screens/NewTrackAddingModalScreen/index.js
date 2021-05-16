import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, Image } from "react-native";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux";

const NewTrackAddingModalScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userId = user.userInfo.id;
  const token = user.accessToken;
  const { data } = route.params;
  const diaryId = data;

  function closeModal() {
    navigation.goBack();
  }

  const [isFetching, setIsFetching] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    fetchTracks(userId, diaryId, searchInput);
  }, [searchInput]);

  const fetchTracks = debounce(async (userId, diaryId, searchInput) => {
    try {
      const tempSearchResult = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track%2Cartist&limit=8&offset=8`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { tracks } = await tempSearchResult.json();

      const searchTrackList = tracks?.items?.map((item, idx) => ({
        songTitle: item.name,
        songId: item.id,
        previewUrl: item.preview_url,
        artistName: item.artists[0].name,
        artistId: item.artists[0].id,
        songJacket: item.album.images[2],
      }));

      setSearchList(searchTrackList);

      console.log(searchList, "??");
    } catch (err) {
      console.warn(err);
    }
  }, 300);

  const handleChangeText = (text) => {
    setSearchInput(text);
  };

  return (
    <View>
      <Button onPress={closeModal} title="Close" />
      <Text>Search track....</Text>
      <TextInput
        placeholder="serach track..."
        blurOnSubmit
        autoCorrect={false}
        maxLength={30}
        placeholderTextColor="#777"
        value={searchInput}
        onChangeText={(text) => handleChangeText(text)}
      />
      <FlatList
        data={searchList}
        keyExtractor={(item, idx) => idx}
        renderItem={({ item, idx }) => {
          return (
            <View>
              <Text>track</Text>
              <Text>{item.songTitle}</Text>
              <Text>{item.artistName}</Text>
              <Image
                source={{ uri: item.songJacket.url }}
                style={{
                  width: item.songJacket.width,
                  height: item.songJacket.height,
                }}
              />
              <Button title="play" />
            </View>
          );
        }}
      />
    </View>
  );
};

export default NewTrackAddingModalScreen;
