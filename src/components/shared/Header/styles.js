import { StyleSheet, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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

export default styles;
