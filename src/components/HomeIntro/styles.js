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
    marginBottom: 8,
    height: 180,
    width: 375,
    backgroundColor: "#1c1f28",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  refreshIcon: {
    marginBottom: 10,
    marginLeft: "20%",
  },
  currentLocationTitleWrapper: {
    flexDirection: "row",
    width: 300,
  },
  currentLocationBox: {
    marginTop: 20,
    flexDirection: "column",
  },
  currentLocationTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    width: 200,
    fontWeight: "400",
    marginBottom: 5,
    color: "#ffffff",
  },
  addressText: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
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
    fontSize: 20,
    color: "#ffffff",
  },
  desc: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: "#ffffff",
    marginTop: 5,
  },
});

export default styles;
