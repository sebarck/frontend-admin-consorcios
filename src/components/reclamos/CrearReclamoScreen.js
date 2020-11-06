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

const CrearReclamoScreen = (props) => {
  const [visibleAprobar, setVisibleAprobar] = React.useState(false);
  const showDialogAprobar = () => setVisibleAprobar(true);
  const hideDialogAprobar = () => setVisibleAprobar(false);

  const [visibleRechazar, setVisibleRechazar] = React.useState(false);
  const showDialogRechazar = () => setVisibleRechazar(true);
  const hideDialogRechazar = () => setVisibleRechazar(false);

  const [textDptoArea, setTextDptoArea] = React.useState("");
  const [textReclamo, setTextReclamo] = React.useState("");

  const [
    selectedValueTipoReclamo,
    setSelectedValueTipoReclamo,
  ] = React.useState("");

  const handleCrearReclamo = () => {
    hideDialogAprobar();
    props.navigation.navigate('Inicio');
  };

  const [selectedValueEdificio, setSelectedValueEdificio] = React.useState("");

  return (
    <View>
      <Title style={{ marginTop: 30, marginLeft: 20 }}>Tipo de reclamo</Title>

      <Picker
        selectedValue={selectedValueTipoReclamo}
        style={{ marginLeft: 20, height: 50, width: 360, marginRight: 20 }}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedValueTipoReclamo(itemValue)
        }
      >
        <Picker.Item label="Seleccione una opción..." value="0" color="grey" />
        <Picker.Item label="Electricidad" value="electricidad" />
        <Picker.Item label="Plomeria" value="plomeria" />
        <Picker.Item label="General" value="general" />
      </Picker>

      <Title style={{ marginTop: 30, marginLeft: 20 }}>Edificio</Title>

      <Picker
        selectedValue={selectedValueEdificio}
        style={{ marginLeft: 20, height: 50, width: 360, marginRight: 20 }}
        onValueChange={(itemValueEdificio, itemIndexEdficio) =>
          setSelectedValueEdificio(itemValueEdificio)
        }
      >
        <Picker.Item label="Seleccione una opción..." value="0" color="grey" />
        <Picker.Item label="Edificio Monti" value="edif_monti" />
        <Picker.Item label="Edificio Dominici" value="edif_dominici" />
        <Picker.Item label="Edificio Pastor" value="edif_pastor" />
      </Picker>

      <Title style={{ marginTop: 30, marginLeft: 20 }}>
        Departamento o área común
      </Title>

      <Picker
        selectedValue={selectedValueEdificio}
        style={{ marginLeft: 20, height: 50, width: 360, marginRight: 20 }}
        onValueChange={(itemValueEdificio, itemIndexEdficio) =>
          setSelectedValueEdificio(itemValueEdificio)
        }
      >
        <Picker.Item label="Seleccione una opción..." value="0" color="grey" />
        <Picker.Item label="Dpto 1A" value="edif_monti" />
        <Picker.Item label="Área común" value="edif_dominici" />
      </Picker>

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
          >
            Crear
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="red"
            style={styles.buttons}
            onPress={() => props.navigation.navigate('Inicio')}
          >
            Cancelar
          </Button>
        </View>
      </View>

      <Portal>
        <Dialog visible={visibleAprobar} onDismiss={hideDialogAprobar}>
          <Dialog.Title>Reclamo registrado</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => handleCrearReclamo()}>OK</Button>
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

  dropdownReclamo: {
    marginLeft: 20,
    marginRight: 20,
    width: 10,
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

  containerImagenes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  iconImagen: {
    flex: 1,
  },

  textImagen: {
    flex: 5,
    marginBottom: 25
  },
});

export default CrearReclamoScreen;
