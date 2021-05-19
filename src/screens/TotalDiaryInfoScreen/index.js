import React from "react";
import { Text, View, Dimensions, StatusBar } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

function TotalDiaryInfoScreen() {
  const handleOnDatPress = (value) => {
    console.log("a", value);
  };

  const commitsData = [
    { date: "2017-01-02", count: 1, energy: 30 },
    { date: "2017-01-03", count: 2, energy: 20  },
    { date: "2017-01-04", count: 3, energy: 11},
  ];

  const energy = [
    { num: `rgba(244, 178, 10, 2)` },
    { num: `rgba(243, 132, 9, 2)` },
    { num: `rgba(135, 122, 234, 2)`},
  ]

  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <ContributionGraph
        values={commitsData}
        endDate={new Date("2017-04-01")}
        numDays={105}
        height={220}
        energy={energy}
        width={Dimensions.get("window").width}
        chartConfig={{
          backgroundColor: "black",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(135, 122, 234, ${opacity})`,
          labelColor: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 2,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "9",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 4,
          paddingTop: 30,
        }}
        onDayPress={handleOnDatPress}
      />
    </View>
  );
}

export default TotalDiaryInfoScreen;
