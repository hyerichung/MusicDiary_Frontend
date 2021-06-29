import React from "react";
import { StyleSheet } from "react-native";
import getHeaderByRoute from "./getHeaderByRoute";
import Header from "../../components/shared/Header";
import { Ionicons } from "@expo/vector-icons";

const setHeaderOptions = (type, route, navigation) => {
  switch (type) {
    case "getHeaderByRoute":
      return { header: () => getHeaderByRoute(route) };
    case "HomeScreenHeader":
      return { header: () => <Header logo={true} /> };
    case "HomeDiaryDetailHeader":
      return {
        headerTitle: null,
        headerLeft: () => (
          <Ionicons
            name="chevron-back"
            onPress={() => navigation.goBack()}
            size={24}
            color="black"
          />
        ),
        headerStyle: {
          shadowColor: "transparent",
        },
      };
    case "AllDiariesHeader":
      return {
        headerTitle: "Diary List",
        headerRight: () => (
          <Ionicons
            onPress={() => navigation.navigate("NewDiaryModal")}
            name="add-outline"
            size={24}
            style={styles.addDiaryButton}
            color="black"
          />
        ),
        headerHideShadow: true,
      };
    case "SingleDiaryDetailHeader":
      return {
        headerTitle: null,
        headerLeft: () => (
          <Ionicons
            name="chevron-back"
            onPress={() => navigation.goBack()}
            size={24}
            color="black"
          />
        ),
        headerStyle: {
          shadowColor: "transparent",
        },
      };
    case "noHeader":
      return { headerShown: false };
  }
};

const styles = StyleSheet.create({
  addDiaryButton: {
    marginRight: 10,
  },
});

export default setHeaderOptions;
