import React from "react";
import IconButton from "../BottomTabBar/IconButton";
import LabelButton from "../DiaryListTopTabBar/LabelButton";

const generateRoutableButton = (state, navigation, type) => {
  return (
    <>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const routeKey = state.routes[index].key;
        const label = route.name;

        const handleLabelPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        switch (type) {
          case "IconButton":
            return (
              <IconButton
                onPress={handleLabelPress}
                label={label}
                isFocused={isFocused}
                key={routeKey}
              />
            );
          case "LabelButton":
            return (
              <LabelButton
                onPress={handleLabelPress}
                label={label}
                isFocused={isFocused}
                key={routeKey}
              />
            );
        }
      })}
    </>
  );
};

export default generateRoutableButton;
