import React from "react";
import { Text, View, Dimensions, StyleSheet, ScrollView } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

import HeatMap from 'react-native-heatmap-chart';

function TotalDiaryInfoScreen() {

  const click = item => {
    console.log(`Value: ${item.value}`);
    console.log(`Index: ${item.index}`);
  };

  return (
    <ScrollView>
      <HeatMap

        numberOfLines={7}
        values={[0, 4, 6, 1, 7, 3, 0, 8, 6, 2, 0, 10, 20, 12, 0, 3, 5, 1, 0, 0, 0, 0, 0,0 ,0,3, 2, 3, 2, 3, 2, 3,1, 2, 3, 4, 5,1, 2, 33, 2, 1, 2, 3, 3, 2, 3, 4, 5, 4, 6, 4, 3, 2, 3, 4, 0, 10, 0, 17, 8, 0, 6, 0, 6, 10, 23]}
        onBlockPress={click}
        colors={['#EE5A24', '#9980FA', '#30a14e', '#9980FA', '#D980FA', '#ED4C67','#D980FA']}
      />
    </ScrollView>
  );

  const handleOnDatPress = (value) => {
    console.log(value);
  };

  const commitsData = [
    { date: "2021-05-21", energy: 5 },
  ];

  return (
    <View style={styles.wrapper}>
      <ContributionGraph
        values={commitsData}
        endDate={new Date("2021-06-31")}
        numDays={78}
        height={250}
        paddingTop={0}
        squareSize={25}
        showOutOfRangeDays={true}
        accessor={"energy"}
        width={Dimensions.get("window").width}
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          color: (opacity = 1) => `rgba(95, 75, 139, ${opacity})`,
          labelColor: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 2,
            paddingTop: 0,
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

// // const styles = StyleSheet.create({

// // });

// import React, { useState, useEffect } from "react";
// import { ScrollView, View, TouchableOpacity } from "react-native";

// const HeatMapBlock = ({
//   size,
//   value,
//   index,
//   colors,
//   colorsPercentage,
//   maximumValue,
//   onBlockPress,
//   style,
// }) => {
//   const valuePercentage = (value / maximumValue) * 100;
//   let color;

//   for (let i = 0; i < colorsPercentage.length; i++) {
//     if (valuePercentage >= colorsPercentage[i]) {
//       color = colors[i];
//     } else {
//       break;
//     }
//   }

//   if (!color) {
//     return null;
//   }

//   return (
//     <TouchableOpacity
//       onPress={() => onBlockPress({ value, index })}
//       style={[
//         styles.heatMapBlock,
//         { backgroundColor: color, width: size, height: size },
//         style
//       ]}
//     />
//   );
// };

// const HeatMapColumn = ({ children }) => (
//   <View style={styles.heatMapColumn}>{children}</View>
// );

// const TotalDiaryInfoScreen = ({
//   numberOfLines = 7,
//   values = [],
//   indexStart = 0,
//   colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
//   colorsPercentage = [0, 0.00001, 41, 60, 80],
//   maximumValue = "relative",
//   blocksSize = 30,
//   onBlockPress = () => {},
//   blocksStyle = {},
// }) => {
//   const [maxValue, setMaxValue] = useState(maximumValue);

//   useEffect(() => {
//     setRelativeMaxValue();
//   }, []);

//   const setRelativeMaxValue = () => {
//     if (maxValue !== "relative") {
//       return;
//     }
//     let max = 1;

//     for (let i = 0; i < values.length; i++) {
//       if (values[i] > max) {
      
//           max = values[i];

//       }

//       setMaxValue(max);
//     }

//     const generateBlocks = (atualBlock) => {
//       const blocks = [];
//       for (let j = 0; j < numberOfLines; j++) {
//           blocks.push(
//             <HeatMapBlock
//               key={Math.random()}
//               style={blocksStyle}
//               size={blocksSize}
//               index={j + atualBlock + indexStart}
//               value={values[j + atualBlock]}
//               colors={colors}
//               colorsPercentage={colorsPercentage}
//               onBlockPress={onBlockPress}
//               maximumValue={maxValue}
//             />
//           );
//         }
//         return blocks;
//       }

//       const generateColumns = () => {
//         const numberOfColumns = values.length / numberOfLines;
//         const columns = [];
//         let atualBlock = 0;

//         for (let i = 0; i < numberOfColumns; i++) {
//           columns.push(
//             <HeatMapColumn key={Math.random()}>
//               {generateBlocks(atualBlock)}
//             </HeatMapColumn>
//           );
//           atualBlock += numberOfLines;
//         }

//         return columns;
//       };

//       return <ScrollView horizontal={true}>{generateColumns()}</ScrollView>;
//   };
// };

// const styles = {
//   heatMapBlock: {
//     borderRadius: 4,
//     margin: 2,
//   },
// };

export default TotalDiaryInfoScreen;
