import React from "react";
import { Image, View, Dimensions } from "react-native";
import { Body, ChefdButton } from "/core-components/index";

export default function NutritionalFacts(props) {
  const { nutritional_image_url } = props.navigation.state.params;
  const { goBack } = props.navigation;
  return (
    <Body
      isHeader
      headerLeftAction={() => goBack()}
      headerLeftIcon={"arrowLeft"}
    >
      <Image
        source={{ uri: nutritional_image_url }}
        style={{
          flex: 1,
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          resizeMode: "contain"
        }}
      />
    </Body>
  );
}
