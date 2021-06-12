import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

const HomeIntro = ({ userName, currentAddress }) => {
  return (
    <View style={styles.userIntroWrapper}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Hi, {userName}</Text>
        <Text style={styles.desc}>Find Diary you wrote within 50m!</Text>
        <View style={styles.currentLocationBox}>
          <Text style={styles.currentLocationTitle}>Your Current Location</Text>
          <Text numberOfLines={2} style={styles.addressText}>
            {currentAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeIntro;
