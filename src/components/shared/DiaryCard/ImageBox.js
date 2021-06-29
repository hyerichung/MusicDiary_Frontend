import React from "react";
import { StyleSheet, View, Image } from "react-native";

const ImageBox = ({ playList }) => {
  return (
    <View style={styles.imgBox}>
      {playList?.length ? (
        <Image
          source={{
            uri: playList[0]?.albumImg[1]?.url,
          }}
          style={styles.albumImg}
        />
      ) : (
        <Image
          style={styles.defaultImg}
          source={require("../../../../assets/empty.png")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 135,
    height: 135,
  },
  albumImg: {
    width: 130,
    height: 135,
  },
  defaultImg: {
    width: 90,
    height: 60,
  },
});

export default ImageBox;
