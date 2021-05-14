import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import PrivateDiaryTopTabNavigator from "./PrivateDiaryTopTabNavigator";

const DiaryStack = createStackNavigator();

const PrivateDiaryListScreenNavigator = () => {
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);

  function handlePressAddNewDiaryBtn() {
    setModalOpen(false);

    // with mock data
    navigation.navigate("Extra", {
      screen: "Diary",
      params: {
        data: {
          id: "1",
          title: "one",
          location: "korea",
          hashTag: "#cafe",
          playList: [],
        },
      },
    });
  }

  return (
    <>
      <View style={styles.container}>
        <Text>search bar</Text>
      </View>

      <Modal
        animationType="slide"
        onBackdropPress={() => setModalOpen(false)}
        presentationStyle="overFullScreen"
        visible={modalOpen}
      >
        <View style={styles.modalContainer}>
          <Button title="closeModal" onPress={() => setModalOpen(false)} />
          <View style={styles.locationContainer}>
            <Text>#</Text>
            <TextInput style={styles.input} />

            <Text>your location</Text>
            {/* {with location mock data} */}
            <TextInput style={styles.input} />

            <View style={styles.searchList}>
              <Text>asdfasdfadsfadsfasfasdf</Text>
            </View>
            <View style={styles.searchList}>
              <Text>asdfasdfadsfadsfasfasdf</Text>
            </View>
            <View style={styles.searchList}>
              <Text>asdfasdfadsfadsfasfasdf</Text>
            </View>
            <View style={styles.searchList}>
              <Text>asdfasdfadsfadsfasfasdf</Text>
            </View>
            <View style={styles.searchList}>
              <Text>asdfasdfadsfadsfasfasdf</Text>
            </View>
            <View style={styles.searchList}>
              <Text>asdfasdfadsfadsfasfasdf</Text>
            </View>
            <View style={styles.searchList}>
              <Text>asdfasdfadsfadsfasfasdf</Text>
            </View>
            <View style={styles.searchList}>
              <Text>asdfasdfadsfadsfasfasdf</Text>
            </View>
            <View style={styles.searchList}>
              <Text>asdfasdfadsfadsfasfasdf</Text>
            </View>
          </View>
        </View>
        <Button title="Submit" onPress={handlePressAddNewDiaryBtn} />
      </Modal>

      <DiaryStack.Navigator>
        <DiaryStack.Screen
          name="DiaryTopTap"
          component={PrivateDiaryTopTabNavigator}
          options={{ headerShown: false }}
        />
      </DiaryStack.Navigator>

      <Button title="AddNewDiary" onPress={() => setModalOpen(true)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    paddingTop: StatusBar.currentHeight,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  locationContainer: {
    backgroundColor: "#ffff",
    width: 300,
    height: 500,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    width: 200,
    margin: 10,
  },
  searchList: {
    backgroundColor: "pink",
    height: 40,
  },
});

export default PrivateDiaryListScreenNavigator;