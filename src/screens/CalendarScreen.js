import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Calendar } from "react-native-calendars";

function CalendarScreen({ navigation }) {
  const dispatch = useDispatch();
  const { byDates } = useSelector((state) => state.diary);

  console.log(byDates, "??");

  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        onDayPress={(day) => {console.log('selected day', day)}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: "#ffffff",
  },
});

export default CalendarScreen;
