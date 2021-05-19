import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import styles from "./styles";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handlePressLogin = async () => {
    await dispatch(loginUser());
  };

  return (
    <View style={styles.loginWrapper}>
      <View style={styles.card}>
        <View>
          <Text style={styles.musicDiaryText}>MUSIC DIARY</Text>
        </View>
        <Text style={styles.descText}>Keep your own playlist</Text>
      </View>
      <TouchableOpacity onPress={handlePressLogin} style={styles.loginBox}>
        <View>
          <Entypo
            style={styles.spotify}
            name="spotify"
            size={24}
            color="black"
          />
          <Text style={styles.loginText}>LOGIN WITH SPOTIFY</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
