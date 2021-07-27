import { useSelector } from "react-redux";

import { COLORS, WEIGHT } from "../constants";

const useCalendar = () => {
  const { byDates } = useSelector((state) => state.diary);

  const energyMap = {};
  const optionMap = {};

  for (let key in byDates) {
    energyMap[key] = { energyScore: 0 };

    const totalEnergyScore = byDates[key].reduce(
      (acc, cur) => acc + cur.energyScore,
      0
    );

    const final = Math.floor(totalEnergyScore / byDates[key].length);

    energyMap[key].energyScore = final;
  }

  const getOption = (backgroundColor, textColor) => {
    const option = {
      customStyles: {
        container: {
          backgroundColor: backgroundColor,
          borderRadius: 0,
        },
        text: {
          color: textColor,
          fontWeight: WEIGHT.BOLD,
        },
      },
    };

    return option;
  };

  const theme = {
    todayTextColor: COLORS.TODAY_TEXT,
    arrowColor: COLORS.ARROW,
    disabledArrowColor: COLORS.DISABLED_ARROW,
    textDayFontWeight: WEIGHT.DEFAULT,
    textMonthFontWeight: WEIGHT.BOLD,
    textDayHeaderFontWeight: WEIGHT.DEFAULT,
  };

  for (let date in energyMap) {
    const energyScore = energyMap[date].energyScore;

    switch (true) {
      case energyScore >= 0 && energyScore <= 20:
        optionMap[date] = getOption(COLORS.LEVEL_ONE, COLORS.WHITE);
        break;
      case energyScore >= 21 && energyScore <= 40:
        optionMap[date] = getOption(COLORS.LEVEL_TWO, COLORS.WHITE);
        break;
      case energyScore >= 41 && energyScore <= 60:
        optionMap[date] = getOption(COLORS.LEVEL_THREE, COLORS.WHITE);
        break;
      case energyScore >= 61 && energyScore <= 80:
        optionMap[date] = getOption(COLORS.LEVEL_FOUR, COLORS.WHITE);
        break;
      case energyScore >= 81 && energyScore <= 100:
        optionMap[date] = getOption(COLORS.LEVEL_FIVE, COLORS.WHITE);
        break;
      default:
        break;
    }
  }

  return { theme, optionMap };
};

export default useCalendar;
