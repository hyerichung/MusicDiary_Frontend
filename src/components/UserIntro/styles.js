import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  withinText: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    width: 180,
    marginTop: 30,
    fontWeight: "200",
    color: "rgba(0, 0, 0, 0.6)",
  },
  userIntroWrapper: {
    flexDirection: "row",
    marginBottom: 15,
    height: 200,
    width: 375,
    backgroundColor: "#1c1f28",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  currentLocationBox: {
    marginTop: 30,
  },
  currentLocationTitle: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    width: 180,
    fontWeight: "400",
    marginBottom: 5,
    color: "#ffffff",
  },
  addressText: {
    fontSize: 13,
    fontFamily: "DMSans_500Medium_Italic",
    width: 300,
    fontWeight: "400",
    marginBottom: 5,
    color: "#ffffff",
  },
  userInfo: {
    flexDirection: "column",
    width: 330,
    height: 170,
    justifyContent: "center",
  },
  userName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  desc: {
    fontFamily: "DMSans_500Medium_Italic",
    fontSize: 13,
    color: "#ffffff",
  },
});

export default styles;
