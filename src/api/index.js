import { API_SERVER_PORT_DEVELOPMENT } from "@env";

export async function loginAPI() {
  const response = await fetch(
    `${API_SERVER_PORT_DEVELOPMENT}/api/users/login`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = response.json();

  return data;
}
