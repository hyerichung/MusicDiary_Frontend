import { API_SERVER_PORT_DEVELOPMENT } from "@env";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";

export async function getAuthCodeAPI() {
  try {
    const authUrl = await fetch(
      `${API_SERVER_PORT_DEVELOPMENT}/api/users/login/url`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await authUrl.json();

    const authCodeResult = await AuthSession.startAsync({
      authUrl: data.authUrl,
    });

    return authCodeResult.params.code;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTokenAPI(authCode) {
  try {
    const tokenInfo = await fetch(
      `${API_SERVER_PORT_DEVELOPMENT}/api/users/login/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authCode }),
      }
    );

    const { data } = await tokenInfo.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserInfoAPI(accessToken) {
  try {
    const userInfo = await fetch(
      `${API_SERVER_PORT_DEVELOPMENT}/api/users/login/user-info`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { data } = await userInfo.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addNewDiaryAPI({ accessToken, newDiaryInfo, userId }) {
  const addedDiaryInfo = await fetch(
    `${API_SERVER_PORT_DEVELOPMENT}/api/users/${userId}/diary/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ newDiaryInfo }),
    }
  );

  const { data } = await addedDiaryInfo.json();

  return data.newDiary;
}

export async function fetchDiariesAPI({ accessToken, userId }) {
  const fetchedDiariesInfo = await fetch(
    `${API_SERVER_PORT_DEVELOPMENT}/api/users/${userId}/diary/all`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const { data } = await fetchedDiariesInfo.json();

  return data.diaries;
}

export async function addTrackToDiaryAPI({
  accessToken,
  userId,
  diaryId,
  currentEnergy,
  trackInfo,
}) {
  const trackAddedResult = await fetch(
    `${API_SERVER_PORT_DEVELOPMENT}/api/users/${userId}/diary/${diaryId}/track/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ trackInfo, currentEnergy }),
    }
  );

  const { data } = await trackAddedResult.json();

  return data;
}

export async function getTrackEnergyScoreAPI({ trackId }) {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const trackEnergyScore = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const { energy } = await trackEnergyScore.json();

  return energy;
}

export async function searchTrackAPI({ searchInput }) {
  const accessToken = await SecureStore.getItemAsync("accessToken");
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

  return resultList;
}
