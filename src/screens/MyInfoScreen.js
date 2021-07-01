import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { clearAccessToken, clearUser } from "../redux/slices/userSlice";
import { clearDiary } from "../redux/slices/diarySlice";
import { clearMusicStatus } from "../redux/slices/musicSlice";

const MyInfoScreen = () => {
  const dispatch = useDispatch();
  const { userName, email } = useSelector((state) => state.user.userInfo);

  const handleLogoutClick = () => {
    try {
      dispatch(clearUser());
      dispatch(clearDiary());
      dispatch(clearMusicStatus());
      dispatch(clearAccessToken());
    } catch (err) {
      console.error("failed to clear Token with logout", err);
    }
  };

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
