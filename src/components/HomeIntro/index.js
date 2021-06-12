import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";

const HomeIntro = ({ onRefreshBtnPress, userName, currentAddress }) => {
  return (
    <View style={styles.userIntroWrapper}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Hi, {userName}</Text>
        <Text style={styles.desc}>Find your music diary by location </Text>
        <View style={styles.currentLocationBox}>
          <View style={styles.currentLocationTitleWrapper}>
            <Text style={styles.currentLocationTitle}>
              Your Current Location
            </Text>
            <TouchableOpacity onPress={onRefreshBtnPress}>
              <MaterialIcons name="refresh" size={24} color="#83848c" />
            </TouchableOpacity>
          </View>
          <Text numberOfLines={2} style={styles.addressText}>
            {currentAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeIntro;
