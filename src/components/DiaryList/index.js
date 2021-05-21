import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
} from "react-native";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

const DiaryList = ({ diaryList, onPressDiary }) => {
  const formatData = (diaryList, numColumns) => {
    const totalRows = Math.floor(diaryList.length / numColumns);
    let totalLastRow = diaryList.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      diaryList.push({ key: "blank", empty: true });
      totalLastRow++;
    }

    return diaryList;
  };

  const renderItem = ({ item, index }) => {
    let { diaryContainer, itemInvisible } = styles;

    if (item.empty) {
      return <View style={[diaryContainer, itemInvisible]} />;
    }

    console.log(item, "??")

    return (
      <View style={diaryContainer}>
        <TouchableOpacity
          key={item._id}
          style={styles.diaryContainer}
          onPress={() => onPressDiary(item)}
        >
          <View>
            <Text>{item.address}</Text>
            <Text>{item.hashTag}</Text>
            <Text>{item.date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.listContainer}>
        <FlatList
          data={formatData(diaryList, numColumns)}
          numColumns={numColumns}
          keyExtractor={(item) => String(item._id)}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  diaryContainer: {
    width: 150,
    height: WIDTH / numColumns,
    flexGrow: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
  },
  listContainer: {
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});

export default DiaryList;
