import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ImageBase,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Paragraph } from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import base64 from "react-native-base64";

export default function SimpleImagePicker() {
  const [imageSource, setImageSource] = useState(null);

  function selectImage() {
    let options = {
      title: "Seleccione origen de la imagen",
      maxWidth: 256,
      maxHeight: 256,
      mediaType: "photo",
      storageOptions: {
        skipBackup: true,
      },
    };

    var source = null;

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("No seleccionó ninguna imagen");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        source = response.data;
      }
      addItem(source);
      setImagenesReclamoLenght(imagenesReclamo2.length);
    });
  }

  const [imagenesReclamo2, setImagenesReclamo2] = useState([]);

  const [imagenesReclamoLenght, setImagenesReclamoLenght] = useState(0);

  function addItem(imageSource) {
    setImagenesReclamo2((prevItems) => {
      return [...prevItems, `data:image/png;base64,${imageSource}`];
    });
  }

  return (
    <View>
      {/* falta agregar condicional de que si es usuario, puede agregar hasta 7.
      Si es inspector, ilimitado! */}
      {imagenesReclamoLenght < 6 && (
        <TouchableOpacity onPress={selectImage}>
          <View style={styles.containerImagenes}>
            <View style={styles.iconImagen}>
              <Icon
                name="camera"
                size={30}
                color="blue"
                style={{ marginLeft: 20, marginBottom: 20 }}
              />
            </View>
            <View style={styles.textImagen}>
              <Paragraph>Adjuntar imágenes</Paragraph>
            </View>
          </View>
        </TouchableOpacity>
      )}
      <SliderBox
        sliderBoxHeight={200}
        images={imagenesReclamo2}
        ImageComponentStyle={{ width: "60%" }}
      />
      <Paragraph></Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImagenes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flex: 1,
  },
  iconImagen: {
    flex: 1,
  },

  textImagen: {
    flex: 5,
    marginBottom: 25,
  },
});
