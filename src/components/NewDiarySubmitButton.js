import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const NewDiarySubmitButton = ({ onPress }) => {
  return (
    <View style={styles.submitButtonWrapper}>
      <TouchableOpacity style={styles.submitButton} onPress={onPress}>
        <Text style={styles.submitText}>S U B M I T</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: "5%",
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "60%",
    backgroundColor: "#0652DD",
  },
  submitText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default NewDiarySubmitButton;
