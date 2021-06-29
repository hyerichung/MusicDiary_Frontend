import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HomeIntro = ({ onRefreshButtonPress, userName, currentAddress }) => {
  return (
    <View style={styles.userIntroWrapper}>
      <View style={styles.userInfoBox}>
        <Text style={styles.userName}>Hi, {userName}</Text>
        <Text style={styles.introDescription}>
          Find your music diary by location
        </Text>
        <View style={styles.currentLocationBox}>
          <View style={styles.currentLocationTitleWrapper}>
            <Text style={styles.currentLocationTitle}>
              Your Current Location
            </Text>
            <TouchableOpacity onPress={onRefreshButtonPress}>
              <MaterialIcons name="refresh" size={24} color="#83848c" />
            </TouchableOpacity>
          </View>
          <View style={styles.currentLocationTextWrapper}>
            <Text numberOfLines={2} style={styles.currentLocationText}>
              {currentAddress}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userIntroWrapper: {
    flexDirection: "row",
    marginBottom: "4%",
    height: "40%",
    width: "100%",
    backgroundColor: "#1c1f28",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  userInfoBox: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    marginLeft: "15%",
  },
  userName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    color: "#ffffff",
  },
  introDescription: {
    marginTop: "2%",
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: "#ffffff",
  },
  currentLocationBox: {
    marginTop: "5%",
    width: "85%",
    height: "45%",
    flexDirection: "column",
  },
  refreshIcon: {
    marginBottom: 10,
    marginLeft: "20%",
  },
  currentLocationTitleWrapper: {
    flexDirection: "row",
    width: "100%",
    height: "35%",
  },
  currentLocationTitle: {
    width: "63%",
    marginBottom: "2%",
    fontFamily: "DMSans_700Bold",
    fontWeight: "400",
    fontSize: 18,
    color: "#ffffff",
  },
  currentLocationTextWrapper: {
    height: "70%",
  },
  currentLocationText: {
    width: "100%",
    marginBottom: "3%",
    fontFamily: "DMSans_500Medium",
    fontWeight: "400",
    fontSize: 15,
    color: "#ffffff",
  },
});

export default HomeIntro;
