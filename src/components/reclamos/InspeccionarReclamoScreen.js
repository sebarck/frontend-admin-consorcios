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
  const [isLoading1, setIsLoading1] = React.useState(false);

  const [textReclamo, setTextReclamo] = React.useState("");

  function setImagenesReclamoLenght() {}

  const { params } = props.route;
  const [detalleReclamo, setDetalleReclamo] = React.useState("");
  const [images, setImages] = React.useState([]);

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
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    obtenerReclamos(params);

    return () => setIsLoading(true);
  }, [props]);

  function addItem(imageSource) {
    setImages([...images, `data:image/png;base64,${imageSource}`]);
  }

  const postBody = JSON.stringify({
    notas: textReclamo,
    id: detalleReclamo.id,
    evidencias: images.reduce(
      (evidencias, evidencia) => [...evidencias, { imagen: evidencia }],
      []
    ),
  });

  const handleValidar = async (detalleReclamo) => {
    setIsLoading1(true);
    backendAdminConsorcios
      .post(`/reclamos/inspecciones/${detalleReclamo.id}`, postBody)
      .then((response) => {
        console.log(response.data);
        setIsLoading1(false);
        showDialogAprobar();
        setTextReclamo("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", width: 350 }}>
          <Subheading style={styles.loadingInfo}>
            Estamos recuperando el detalle del reclamo
          </Subheading>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      ) : (
        <View>
          <Title style={styles.titulo}>Inspección de reclamos</Title>
          <TextInput
            label="Ingrese una nota"
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

          {isLoading1 ? (
            <ActivityIndicator animating={true} size={"small"} />
          ) : (
            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  color="green"
                  style={styles.buttons}
                  onPress={() => handleValidar(detalleReclamo)}
                  labelStyle={styles.buttonsLabel}
                >
                  Procesar
                </Button>
              </View>
            </View>
          )}
        </View>
      )}

      <Portal>
        <Dialog
          visible={visibleProcesar}
          onDismiss={() => hideDialogProcesar(detalleReclamo)}
        >
          <Dialog.Title>Reclamo procesado</Dialog.Title>
          <Dialog.Actions>
            <Button
              color="black"
              onPress={() => hideDialogProcesar(detalleReclamo)}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
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
