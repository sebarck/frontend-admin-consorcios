import React from "react";
import { View, StyleSheet} from "react-native";
import {
  TextInput,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";

const InspeccionarReclamoScreen = () => {
  const [visibleAprobar, setVisibleAprobar] = React.useState(false);
  const showDialogAprobar = () => setVisibleAprobar(true);
  const hideDialogAprobar = () => setVisibleAprobar(false);

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
        label="Piso"
        value={textPiso}
        onChangeText={(textPiso) => setTextPiso(text)}
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
        disabled="true"
      />

      {/* Pendientes
      2) Falta agregar el componente para adjuntar imágenes (https://github.com/react-native-image-picker/react-native-image-picker)
      */}

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="green"
            style={styles.buttons}
            // onPress={() => console.log("Pressed")}
            onPress={showDialogAprobar}
          >
            Aprobar
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="red"
            style={styles.buttons}
            onPress={showDialogRechazar}
          >
            Rechazar
          </Button>
        </View>
      </View>
      
      
      <Portal>
        <Dialog visible={visibleAprobar} onDismiss={hideDialogAprobar}>
          <Dialog.Title>Fecha de resolución</Dialog.Title>
          <Dialog.Content>
            <TextInput
            // label="Email"
            // value={text}
            // onChangeText={(text) => setText(text)}
            style={styles.fechaResolucionReclamo}
            />
          </Dialog.Content>
          <Dialog.Title>Comentario</Dialog.Title>
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
            <Button onPress={hideDialogAprobar}>Cancel</Button>
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

export default InspeccionarReclamoScreen;