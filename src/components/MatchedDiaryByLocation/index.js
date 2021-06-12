import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

const MatchedDiaryByLocation = ({ allDiaryByIds, getMatchedDiary, navigation }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const asdf = async () => {
      setList(await getMatchedDiary(allDiaryByIds));
    };

    asdf();
  }, [allDiaryByIds]);

  function moveToRelevantDiary(clickedDiary) {
    navigation.navigate("Diary", {
      screen: "SingleDiary",
      params: { data: clickedDiary },
    });
  }

  return (
    <View style={styles.diaryListBox}>
      <FlatList
        data={list}
        keyExtractor={(list, index) => String(index)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => moveToRelevantDiary(item)}
              style={styles.cardBox}
            >
              <View style={styles.imgBox}>
                {item?.playList?.length ? (
                  <Image
                    source={{
                      uri: item?.playList[0]?.albumImg[1]?.url,
                      width: 130,
                      height: 135,
                    }}
                  />
                ) : (
                  <Image
                    style={styles.img}
                    source={require("../../../assets/empty.png")}
                  />
                )}
              </View>

              <View stlye={styles.diaryContainer}>
                <View style={styles.hashTagWrapper}>
                  <Text style={styles.hashTagText}>
                    # {item?.hashTag ? item.hashTag : "No diary"}
                  </Text>
                </View>
                <View style={styles.dateWrapper}>
                  <Text style={styles.dateText}>
                    {item?.date ? item.date : null}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 90,
    height: 60,
  },
  cardBox: {
    height: 180,
    width: 135,
    marginLeft: 8,
    marginRight: 5,
  },
  imgBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 135,
    height: 135,
  },
  withinText: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    width: 180,
    marginTop: 30,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
  },
  hashTagWrapper: {
    width: 130,
    marginTop: 5,
    alignItems: "center",
    color: "black",
  },
  hashTagText: {
    fontSize: 13,
    width: 120,
    color: "black",
    fontWeight: "600",
  },
  dateWrapper: {
    width: 120,
    justifyContent: "center",
    textAlign: "center",
    marginLeft: 3,
    marginTop: 5,
  },
  dateText: {
    fontSize: 9,
    height: 20,
    marginLeft: 5,
    color: "black",
    fontWeight: "700",
  },
  homeLocationLogo: {
    width: 150,
    height: 150,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  diaryWrapper: {
    width: 130,
    height: 230,
    borderWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.3)",
    flexDirection: "column",
    marginTop: 15,
    fontWeight: "500",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  diaryContainer: {
    width: 140,
    height: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  titleContainer: {
    height: "10%",
  },
  playListContainer: {
    height: "80%",
    borderWidth: 1,
  },
  trackContainer: {
    borderWidth: 1,
  },
});

export default MatchedDiaryByLocation;
