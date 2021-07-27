import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import useMyInfo from "../hooks/useMyInfo";

const MyInfoScreen = () => {
  const { userName, email, handleLogoutClick } = useMyInfo();
  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.infoWrapper}>
        <View style={styles.nameBox}>
          <Text style={styles.name}>{userName}</Text>
        </View>
        <Text style={styles.email}>{email}</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogoutClick}
        >
          <Text style={styles.logoutText}>→ Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  infoWrapper: {
    height: "80%",
  },
  nameBox: {
    width: "60%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 25,
  },
  logoutButton: {
    height: "10%",
    marginTop: "10%",
  },
  logoutText: {
    fontSize: 20,
  },
});

export default MyInfoScreen;
