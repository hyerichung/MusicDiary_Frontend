import { useState, useEffect, useCallback } from "react";

import { debounce } from "lodash";
import { searchTrackAPI } from "../api";
import { URI } from "../constants";

const useSearchTrack = (navigation) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    fetchTracks(searchInput);
  }, [searchInput]);

  const handleAddTrackToDiaryButtonPress = useCallback(
    (trackInfo) => {
      navigation.navigate("DiarySelection", { diary: trackInfo });
    },
    [navigation]
  );

  const handleTextChange = (text) => {
    setSearchInput(text);
  };

  const fetchTracks = debounce(
    useCallback(async (searchInput) => {
      try {
        const resultList = await searchTrackAPI({ searchInput });

        const result = resultList?.tracks?.items.map((list) => ({
          title: list.name,
          id: list.id,
          uri: list.uri,
          preview: list.preview_url ?? URI.ALT,
          duration: list.duration_ms,
          artist: list.artists[0].name,
          albumImg: list.album.images,
        }));
        setSearchList(result);
      } catch (err) {
        console.warn(err);
      }
    }, []),
    800
  );

  return {
    searchInput,
    handleTextChange,
    searchList,
    handleAddTrackToDiaryButtonPress,
  };
};

export default useSearchTrack;
