import React from "react";
import { View, StyleSheet, Picker } from "react-native";
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Title,
  Paragraph,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const InspeccionarReclamoScreen = () => {
  const [visibleAprobar, setVisibleAprobar] = React.useState(false);
  const showDialogAprobar = () => setVisibleAprobar(true);
  const hideDialogAprobar = () => setVisibleAprobar(false);

  const [visibleActualizar, setVisibleActualizar] = React.useState(false);
  const showDialogActualizar = () => setVisibleActualizar(true);
  const hideDialogActualizar = () => setVisibleActualizar(false);

  const [visibleRechazar, setVisibleRechazar] = React.useState(false);
  const showDialogRechazar = () => setVisibleRechazar(true);
  const hideDialogRechazar = () => setVisibleRechazar(false);

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
        disabled="true"
      />

      <TextInput
        label="Edificio"
        value={textEdificio}
        onChangeText={(textEdificio) => setTextEdificio(textEdificio)}
        style={styles.text}
        disabled="true"
      />

      <TextInput
        label="Departamento, área común, etc"
        value={textDptoArea}
        onChangeText={(textDptoArea) => setTextDptoArea(textDptoArea)}
        style={styles.text}
        disabled="true"
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
      2) Falta agregar el componente para adjuntar imágenes (https://github.com/react-native-image-picker/react-native-image-picker)
      */}

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

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="green"
            style={styles.buttons}
            // onPress={() => console.log("Pressed")}
            onPress={showDialogAprobar}
            labelStyle={styles.buttonsLabel}
          >
            Procesar
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="blue"
            style={styles.buttons}
            compact="true"
            labelStyle={styles.buttonsLabel}
            onPress={showDialogActualizar}
          >
            Actualizar
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="red"
            style={styles.buttons}
            labelStyle={styles.buttonsLabel}
            onPress={showDialogRechazar}
          >
            Rechazar
          </Button>
        </View>
      </View>
      
      
      <Portal>
        <Dialog visible={visibleAprobar} onDismiss={hideDialogAprobar}>
          <Dialog.Title>Reclamo procesado</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => console.log("Ok")}>Ok</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={visibleActualizar} onDismiss={hideDialogActualizar}>
          <Dialog.Title>Reclamo actualizado</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => console.log("Ok")}>Ok</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={visibleRechazar} onDismiss={hideDialogRechazar}>
          <Dialog.Title>Motivo de rechazo</Dialog.Title>
          <Dialog.Content>
            <TextInput
            // label="Email"
            // value={text}
            // onChangeText={(text) => setText(text)}
            style={styles.comentarioResolucionReclamo}
            multiline={true}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialogRechazar}>Cancel</Button>
            <Button onPress={() => console.log("Ok")}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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

  fechaResolucionReclamo: {
    color: "red",
    fontWeight: "bold",
    textAlignVertical: "top",
    height: 40,
  },

  comentarioResolucionReclamo: {
    color: "red",
    fontWeight: "bold",
    textAlignVertical: "top",
    height: 100,
  },

  buttons: {
    width: 120,
    margin: 5,
  },

  buttonsLabel:{
    fontSize:14,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  containerImagenes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20,
    marginTop:20,
  },
  iconImagen: {
    flex: 1,
  },

  textImagen: {
    flex: 5,
    marginBottom:25
  }, 
});

export default InspeccionarReclamoScreen;