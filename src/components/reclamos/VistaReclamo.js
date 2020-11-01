import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

const VistaReclamo = () => {
  const [textTipoReclamo, setTextTipoReclamo] = React.useState("");
  const [textPiso, setTextPiso] = React.useState("");
  const [textEdificio, setTextEdificio] = React.useState("");
  const [textDptoArea, setTextDptoArea] = React.useState("");
  const [textReclamo, setTextReclamo] = React.useState("");

  return (
    <View>
      <TextInput
        label="Tipo de reclamo"
        value={textTipoReclamo}
        onChangeText={(textTipoReclamo) => setTextTipoReclamo(textTipoReclamo)}
        style={styles.text}
      />

      <TextInput
        label="Piso"
        value={textPiso}
        onChangeText={(textPiso) => setTextPiso(text)}
        style={styles.text}
      />

      <TextInput
        label="Edificio"
        value={textEdificio}
        onChangeText={(textEdificio) => setTextEdificio(textEdificio)}
        style={styles.text}
      />

      <TextInput
        label="Departamento, area común, etc"
        value={textDptoArea}
        onChangeText={(textDptoArea) => setTextDptoArea(textDptoArea)}
        style={styles.text}
      />

      <TextInput
        label="Descripción del reclamo"
        value={textReclamo}
        onChangeText={(textReclamo) => setTextReclamo(textReclamo)}
        style={styles.textReclamo}
        numberOfLines={20}
        multiline={true}
      />

      {/* Pendientes
      1) Falta ver cómo alinear el label del componente en el TOP 
      2) Falta agregar el componente para adjuntar imágenes (https://github.com/react-native-image-picker/react-native-image-picker)
      */}

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="green"
            style={styles.buttons}
            onPress={() => console.log("Pressed")}
          >
            Aprobar
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="red"
            style={styles.buttons}
            onPress={() => console.log("Pressed")}
          >
            Rechazar
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "red",
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textReclamo: {
    color: "red",
    fontWeight: "bold",
    textAlignVertical: "top",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
    height: 200,
  },

  buttons: {
    width: 150,
    marginLeft: 22,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default VistaReclamo;
