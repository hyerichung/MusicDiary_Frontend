import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Header from "../../components/shared/Header";

const getHeaderByRoute = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Calendar":
    case "MyInfo":
      return <Header logo={true} />;
    case "Auth":
      return null;
    default:
      return <Header logo={false} />;
  }
};

export default getHeaderByRoute;
