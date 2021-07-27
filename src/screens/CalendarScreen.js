import React from "react";
import { View, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

import { NAMES } from "../constants";
import useCalendar from "../hooks/useCalendar";

LocaleConfig.locales.custom = {
  monthNames: NAMES.MONTH_DEFAULT,
  monthNamesShort: NAMES.MONTH_SHORT,
  dayNames: NAMES.DAY_DEFAULT,
  dayNamesShort: NAMES.DAY_SHORT,
  today: NAMES.TODAY,
};
LocaleConfig.defaultLocale = "custom";

const CalendarScreen = () => {
  const { theme, optionMap } = useCalendar();

  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        onDayPress={(day) => {
          /* TODO: navigate to relevant diaryByDate toptab sub page */
        }}
        theme={theme}
        markingType={"custom"}
        markedDates={optionMap}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarWrapper: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: "#ffffff",
  },
});

export default CalendarScreen;
