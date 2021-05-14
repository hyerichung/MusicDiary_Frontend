import { API_SERVER_PORT_DEVELOPMENT } from "@env";
import * as AuthSession from "expo-auth-session";

export async function getAuthCodeAPI() {
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
}

export async function getAccessTokenAPI(authCode) {
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
}

export async function getUserInfoAPI(accessToken) {
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
}

export async function addNewDiaryAPI({ accessToken, diaryTitleInfo, userId }) {
  const addedDiaryInfo = await fetch(
    `${API_SERVER_PORT_DEVELOPMENT}/api/users/${userId}/diary/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ diaryTitleInfo }),
    }
  );

  const { data } = await addedDiaryInfo.json();

  return data;
}
