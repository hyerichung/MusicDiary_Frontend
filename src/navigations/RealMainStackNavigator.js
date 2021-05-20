import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MainBottomTabNavigator from "./MainBottomTabNavigator";
import ExtraScreenNavigator from "./ExtraScreenNavigator";

const RealMainStack = createStackNavigator();

const RealMainStackNavigator = () => {
  const HeaderStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar]}>
      <SafeAreaView>
        <StatusBar
          translucent={true}
          backgroundColor={styles.backgroundColor}
          {...props}
        />
      </SafeAreaView>
    </View>
  );

  function getHeader(route, props) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

    switch (routeName) {
      case "Home":
      case "My":
      case "Info":
        return (
          <View style={styles.colors}>
            <HeaderStatusBar {...props} />
            <View style={styles.header} {...props}>
              <Image
                style={styles.img}
                source={require("../../assets/header_logo.png")}
              />
            </View>
          </View>
        );
      case "Diary":
        return (
          <View>
            <HeaderStatusBar {...props} />
          </View>
        );
      case "Extra":
        return null;
    }
  }

  return (
    <>
      <RealMainStack.Navigator>
        <RealMainStack.Screen
          name="Main"
          component={MainBottomTabNavigator}
          options={({ route }) => ({
            header: (props) => getHeader(route, props),
          })}
        />
        <RealMainStack.Screen
          name="Extra"
          component={ExtraScreenNavigator}
          options={({ route }) => ({
            header: (props) => getHeader(route, props),
          })}
        />
      </RealMainStack.Navigator>
    </>
  );
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const { width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  statusBar: {
    backgroundColor: "#ffffff",
    height: STATUSBAR_HEIGHT,
  },
  img: {
    width: 55,
    height: 55,
  },
});

export default RealMainStackNavigator;
