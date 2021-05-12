import * as React from "react";
import { View, TouchableOpacity } from "react-native";

import styles from "./styles";

import TabWrapper from "./TabWrapper";

const TabBar = ({ navigation }) => {
  const navigationFunc = navigation.navigation;
  const navigationState = navigation.state;
  const currentRouteName = navigationState.routeNames[navigationState.index];

  return (
    <View>
      <TabWrapper
        handleTabPress={() => {
          navigationFunc.navigate("Home");
        }}
        text="Home"
        isActive={currentRouteName === "Home"}
      />
      <TabWrapper
        handleTabPress={() => {
          navigationFunc.navigate("PrivateDiary");
        }}
        text="PrivateDiary"
        isActive={currentRouteName === "PrivateDiary"}
      />
      <TabWrapper
        handleTabPress={() => {
          navigationFunc.navigate("My");
        }}
        text="My"
        isActive={currentRouteName === "My"}
      />
    </View>
  );
};

export default TabBar;
