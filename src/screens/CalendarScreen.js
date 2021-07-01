import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales.custom = {
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
LocaleConfig.defaultLocale = "custom";

function CalendarScreen() {
  const { byDates } = useSelector((state) => state.diary);

  const energyMap = {};

  for (let key in byDates) {
    energyMap[key] = { energyScore: 0 };

    const totalEnergyScore = byDates[key].reduce(
      (acc, cur) => acc + cur.energyScore,
      0
    );

    const final = Math.floor(totalEnergyScore / byDates[key].length);

    energyMap[key].energyScore = final;
  }

  const one = "#581CD4";
  const two = "#0a21a6";
  const thr = "#1374f2";
  const four = "#d91895";
  const five = "#f20f62";

  const optionMap = {};

  const getOption = (backgroundColor, textColor) => {
    const option = {
      customStyles: {
        container: {
          backgroundColor: backgroundColor,
          borderRadius: 0,
        },
        text: {
          color: textColor,
          fontWeight: "bold",
        },
      },
    };

    return option;
  };

  const theme = {
    todayTextColor: "#0652DD",
    arrowColor: "#1c1f28",
    disabledArrowColor: "#d9e1e8",
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "300",
  };

  for (let date in energyMap) {
    const energyScore = energyMap[date].energyScore;

    switch (true) {
      case energyScore >= 0 && energyScore <= 20:
        optionMap[date] = getOption(one, "#ffffff");
        break;
      case energyScore >= 21 && energyScore <= 40:
        optionMap[date] = getOption(two, "#ffffff");
        break;
      case energyScore >= 41 && energyScore <= 60:
        optionMap[date] = getOption(thr, "#ffffff");
        break;
      case energyScore >= 61 && energyScore <= 80:
        optionMap[date] = getOption(four, "#ffffff");
        break;
      case energyScore >= 81 && energyScore <= 100:
        optionMap[date] = getOption(five, "#ffffff");
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        onDayPress={(day) => {
          /* TODO: navigate to relevant diaryByDate toptab sub page */
          console.log("selected day", day);
        }}
        theme={theme}
        markingType={"custom"}
        markedDates={optionMap}
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
