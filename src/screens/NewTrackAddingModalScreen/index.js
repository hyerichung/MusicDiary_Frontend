import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux";
import { listenMusic, setPlayList } from "../../redux/slices/musicSlice";

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

  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    fetchTracks(searchInput);
  }, [searchInput]);

  async function handleSelectSong(item, index) {
    await dispatch(listenMusic({ item, index }));
    await dispatch(setPlayList(searchList));
  }

  const fetchTracks = debounce(async (searchInput) => {
    try {
      const tempSearchResult = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track%2Cartist&limit=15&${offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultList = await tempSearchResult.json();

      const searchTrackList = resultList?.tracks?.items.map((track, idx) => ({
        title: track.name,
        id: track.id,
        uri: track.uri,
        preview:
          track.preview_url ??
          "https://p.scdn.co/mp3-preview/bc5f3e28ba28c76b36f409d3c3f697e597b6ff6f?cid=41014a1f3ad143a8be14a47f025c209d",
        duration: track.duration_ms,
        artist: track.artists[0].name,
        albumImg: track.album.images[2],
      }));

      setSearchList(searchTrackList);
    } catch (err) {
      console.warn(err);
    }
  }, 800);

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
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => {
          return (
            <>
              <TouchableOpacity onPress={() => handleSelectSong(item, index)}>
                <Text>track</Text>
                <Text>{item.title}</Text>
                <Text>{item.artist}</Text>
                <Image
                  source={{ uri: item?.albumImg.url }}
                  style={{
                    width: item.albumImg.width,
                    height: item.albumImg.height,
                  }}
                />
                <Button title="add to playlist" />
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
};

export default NewTrackAddingModalScreen;
