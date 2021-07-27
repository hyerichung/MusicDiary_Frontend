import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function ViewAllScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All matched diaries</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
});

export default ViewAllScreen;
