import React from "react";
import { View, Text, Button } from "react-native";

const EditDiaryModalScreen = ({ route, navigation }) => {
  function closeModal() {
    navigation.goBack();
  }

  return (
    <View>
      <Button onPress={closeModal} title="Close" />
      <Button onPress={closeModal} title="Save" />
      <Text>editing mode.....</Text>
    </View>
  );
};

export default EditDiaryModalScreen;
