import React from "react";
import { View } from "react-native";
import { Paragraph } from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import base64 from "react-native-base64";

export default function ImagesSlider(props) {
  return (
    <View>
    {/* {console.log("ImagesSlider.js")}
    {console.log(props.imagenes)} */}
      <SliderBox
        sliderBoxHeight={200}
        images={props.imagenes}
        ImageComponentStyle={{ width: "60%" }}
      />
      <Paragraph></Paragraph>
    </View>
  );
}
