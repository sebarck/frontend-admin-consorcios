import React, { useEffect } from "react";
import { View, StyleSheet, Picker } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  TextInput,
  Button,
  Dialog,
  Portal,
  Title,
  Subheading,
} from "react-native-paper";
import SimpleImagePicker from "../imagePicker/SimpleImagePicker";
import ImagesSlider from "../imagesSlider/ImagesSlider";
import backendAdminConsorcios from "../../apis/backendAdminConsorcios";

// a este componente habría que cambiarle el nombre a "validar reclamos"

const InspeccionarReclamoScreen = (props) => {
  const [visibleProcesar, setvisibleProcesar] = React.useState(false);
  const showDialogAprobar = () => setvisibleProcesar(true);

  const [visibleActualizar, setVisibleActualizar] = React.useState(false);
  const showDialogActualizar = () => setVisibleActualizar(true);

  const hideDialogActualizar = (reclamo) => {
    setVisibleActualizar(false);
    console.log("Reclamo actualizado por inspector");
    props.navigation.navigate("Detalle", { reclamo: reclamo });
  };

  const hideDialogProcesar = (reclamo) => {
    setvisibleProcesar(false);
    console.log("Reclamo procesado por inspector");
    props.navigation.navigate("Detalle", { reclamo: reclamo });
  };

  const [isLoading, setIsLoading] = React.useState(true);

  const [textReclamo, setTextReclamo] = React.useState("");

  function setImagenesReclamoLenght() {}

  const { params } = props.route;
  const [detalleReclamo, setDetalleReclamo] = React.useState("");
  const [images, setImages] = React.useState([]);

  function addItem(imageSource) {
    setImages([...images, `data:image/png;base64,${imageSource}`]);
  }

  useEffect(() => {
    const obtenerReclamos = async ({ reclamo }) => {
      backendAdminConsorcios
        .get("/reclamos/" + reclamo.id)
        .then((response) => {
          setDetalleReclamo(response.data);
          if (typeof detalleReclamo.evidencias != "undefined")
            setImages(
              detalleReclamo.evidencias.map((reclamo) => reclamo.imagen)
            );
          setTextReclamo(detalleReclamo.descripcion);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    obtenerReclamos(params);

    return () => setIsLoading(true);
  }, [props]);

  return (
    <ScrollView>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", width: 350 }}>
          <Subheading style={styles.loadingInfo}>
            Estamos recuperando el detalle de tu reclamo
          </Subheading>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      ) : (
        <View>
          <Title style={styles.titulo}>Inspección de reclamos</Title>
          <TextInput
            label="Descripción del reclamo"
            value={textReclamo}
            onChangeText={(textReclamo) => setTextReclamo(textReclamo)}
            style={styles.textReclamo}
            numberOfLines={20}
            multiline={true}
          />

          <SimpleImagePicker
            arrayImagenes={images}
            imagenesLenght={0}
            addItemFunction={addItem}
            setImagenesReclamoLenghtFunction={setImagenesReclamoLenght}
          />

          <ImagesSlider imagenes={images} />

          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                color="green"
                style={styles.buttons}
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
                Guardar
              </Button>
            </View>
          </View>
        </View>
      )}

      <Portal>
        <Dialog visible={visibleProcesar} onDismiss={() => hideDialogProcesar(detalleReclamo)}>
          <Dialog.Title>Reclamo procesado</Dialog.Title>
          <Dialog.Actions>
            <Button color="black" onPress={() => hideDialogProcesar(detalleReclamo)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          visible={visibleActualizar}
          onDismiss={() => hideDialogActualizar(detalleReclamo)}
        >
          <Dialog.Title>Reclamo actualizado</Dialog.Title>
          <Dialog.Actions>
            <Button color="black" onPress={() => hideDialogActualizar(detalleReclamo)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>

        {/* <Dialog visible={visibleRechazar} onDismiss={hideDialogRechazar}>
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
        </Dialog> */}
      </Portal>
    </ScrollView>
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
  loadingInfo: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 40,
  },
  titulo: {
    marginLeft: 20,
    marginTop: 30,
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

  buttonsLabel: {
    fontSize: 14,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 25,
  },
});

export default InspeccionarReclamoScreen;
