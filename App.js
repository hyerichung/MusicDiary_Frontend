import { StatusBar } from "expo-status-bar";
import React from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { loginUser } from "./src/redux/slices/userSlice";
import store from "./src/redux/store";

const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Text>Home screen</Text>
    </View>
  );
};

const LoginScreen = () => {
  const accessToken = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();

  const handlePressLogin = () => {
    dispatch(loginUser());
  };

  return (
    <View>
      <Button onPress={handlePressLogin} title="Login"></Button>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
