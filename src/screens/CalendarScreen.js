import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales.cu = {
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  today: "Today",
};
LocaleConfig.defaultLocale = "cu";

function CalendarScreen({ navigation }) {
  const dispatch = useDispatch();
  const { byDates } = useSelector((state) => state.diary);

  console.log(byDates, "??");

  const a = Object.values(byDates);
  console.log(a, "a");

  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        theme={{
          todayTextColor: "#0652DD",
          arrowColor: "#1c1f28",
          disabledArrowColor: "#d9e1e8",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
        }}
        markingType={"custom"}
        markedDates={{
          "2021-06-30": {
            customStyles: {
              container: {
                backgroundColor: "green",
              },
              text: {
                color: "black",
                fontWeight: "bold",
              },
            },
          },
          "2021-07-01": {
            customStyles: {
              container: {
                backgroundColor: "white",
                elevation: 2,
              },
              text: {
                color: "blue",
              },
            },
          },
        }}
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
