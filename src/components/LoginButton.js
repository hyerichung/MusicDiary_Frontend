import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const LoginBtn = ({ onPressLoginBtn }) => {
  return (
    <View style={styles.loginWrapper}>
      <View style={styles.card}>
        <View>
          <Text style={styles.musicDiaryText}>MUSIC DIARY</Text>
        </View>
        <Text style={styles.descText}>Keep your own playlist</Text>
      </View>
      <TouchableOpacity onPress={onPressLoginBtn} style={styles.loginBox}>
        <Entypo style={styles.spotify} name="spotify" size={24} color="black" />
        <Text style={styles.loginText}>LOGIN WITH SPOTIFY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 0,
    padding: 0,
    flexDirection: "column",
    height: 235,
    width: 220,
    backgroundColor: "#F16862",
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderBottomColor: "transparent",
  },
  loginBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 220,
    borderWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderTopColor: "transparent",
    backgroundColor: "#ededed",
  },
  musicDiaryText: {
    transform: [{ rotate: "-90deg" }],
    fontSize: 25,
    fontWeight: "600",
    position: "absolute",
    top: 110,
    left: -60,
    right: 100,
  },
  descText: {
    transform: [{ rotate: "-90deg" }],
    fontSize: 14,
    fontWeight: "400",
    position: "absolute",
    top: 60,
    bottom: 40,
    left: 25,
    right: 25,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "700",
    position: "absolute",
    right: 25,
    bottom: 29,
  },
  spotify: {
    position: "absolute",
    left: 15,
    bottom: 25,
  },
});

export default LoginBtn;
