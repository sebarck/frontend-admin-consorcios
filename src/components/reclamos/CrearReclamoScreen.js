import React, { useState, useEffect } from "react";
import { View, StyleSheet, Picker } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import backendAdminConsorcios from "../../apis/backendAdminConsorcios";
import ImagesSlider from "../imagesSlider/ImagesSlider";
import SimpleImagePicker from "../imagePicker/SimpleImagePicker";

const CrearReclamoScreen = (props) => {
  const { loggedUserInfo } = props.route.params;
  console.log(
    `El edificio es: ${loggedUserInfo.persona.propiedad.edificio.calle} ${loggedUserInfo.persona.propiedad.edificio.altura}, ${loggedUserInfo.persona.propiedad.edificio.barrio}`
  );
  console.log(
    `Y la unidad funcional es: Piso ${loggedUserInfo.persona.propiedad.piso}, unidad ${loggedUserInfo.persona.propiedad.unidad}`
  );

  const [visibleAprobar, setVisibleAprobar] = React.useState(false);
  const showDialogAprobar = () => setVisibleAprobar(true);
  const hideDialogAprobar = () => setVisibleAprobar(false);

  const [textDptoArea, setTextDptoArea] = React.useState("");
  const [textReclamo, setTextReclamo] = React.useState("");
  const [tituloReclamo, setTituloReclamo] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [errorDetail, setErrorDetail] = React.useState("");
  const [idReclamoCreado, setIdReclamoCreado] = React.useState("");
  const mostrarSpinner = () => setIsLoading(true);
  const ocultarSpinner = () => setIsLoading(false);

  const [
    selectedValueTipoReclamo,
    setSelectedValueTipoReclamo,
  ] = React.useState("");

  const [selectedValueEdificio, setSelectedValueEdificio] = React.useState("");

  const handleCerrarDialogSuccess = () => {
    hideDialogAprobar();
    setErrorDetail("");
    setIdReclamoCreado("");
    props.navigation.navigate("Inicio");
    setFlagCancelarReclamo(!flagCancelarReclamo);
  };

  const handleCrearReclamo = async () => {
    mostrarSpinner();
    response = await backendAdminConsorcios
      .post("/reclamos", postBody)
      .then((response) => {
        //console.log(response);
        setIsSuccess(true);
        setIdReclamoCreado(response.data.id);
        ocultarSpinner();
        showDialogAprobar();
        setTextDptoArea("");
        setSelectedValueEdificio(0);
        setSelectedValueTipoReclamo(0);
        setTextReclamo("");
        setTituloReclamo("");
      })
      .catch((error) => {
        setErrorDetail(error.response.data.error);
        setIsSuccess(false);
        ocultarSpinner();
        showDialogAprobar();
      });
    setFlagCancelarReclamo(!flagCancelarReclamo);
  };

  const [flagCancelarReclamo, setFlagCancelarReclamo] = React.useState(false);

  function handleCancelar() {
    setFlagCancelarReclamo(!flagCancelarReclamo);
    props.navigation.navigate("Inicio");
  }

  //images picker y slider

  const [imagenesReclamo, setImagenesReclamo] = React.useState([]);

  const [imagenesReclamoLenght, setImagenesReclamoLenght] = React.useState(0);

  function addItem(imageSource) {
    setImagenesReclamo([
      ...imagenesReclamo,
      `data:image/png;base64,${imageSource}`,
    ]);
  }

  const postBody = JSON.stringify({
    categoria: selectedValueTipoReclamo,
    titulo: tituloReclamo,
    descripcion: textReclamo,
    edificio: { id: loggedUserInfo.persona.propiedad.edificio.id },
    propiedad: { id: loggedUserInfo.persona.propiedad.id },
    viviente: { id: loggedUserInfo.persona.id },
    inspector: { id: 1 },
    evidencias: imagenesReclamo.reduce(
      (evidencias, evidencia) => [...evidencias, { imagen: evidencia }],
      []
    ),
  });

  useEffect(() => {
    deleteAllItem();
  }, [flagCancelarReclamo]);

  function deleteAllItem() {
    imagenesReclamo.length = 0;
    setImagenesReclamoLenght(imagenesReclamo.length);
  }

  return (
    <ScrollView>
      <Title style={{ marginTop: 30, marginLeft: 20 }}>Título</Title>
      <TextInput
        label="Inserte un título"
        value={tituloReclamo}
        onChangeText={(tituloReclamo) => setTituloReclamo(tituloReclamo)}
        style={styles.tituloReclamo}
        numberOfLines={2}
        multiline={true}
      />
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
        onValueChange={(itemValueEdificio, itemIndexEdificio) =>
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
        selectedValue={textDptoArea}
        style={{ marginLeft: 20, height: 50, width: 360, marginRight: 20 }}
        onValueChange={(itemValueDptoArea, itemIndexEdificio) =>
          setTextDptoArea(itemValueDptoArea)
        }
      >
        <Picker.Item label="Seleccione una opción..." value="0" color="grey" />
        <Picker.Item label="Dpto 1A" value="edif_monti" />
        <Picker.Item label="Área común" value="edif_dominici" />
      </Picker>
      <Title style={{ marginTop: 30, marginLeft: 20 }}>Descripción</Title>

      <TextInput
        label="Ingrese una descripción"
        value={textReclamo}
        onChangeText={(textReclamo) => setTextReclamo(textReclamo)}
        style={styles.textReclamo}
        numberOfLines={20}
        multiline={true}
      />

      <SimpleImagePicker
        arrayImagenes={imagenesReclamo}
        imagenesLenght={imagenesReclamoLenght}
        addItemFunction={addItem}
        setImagenesReclamoLenghtFunction={setImagenesReclamoLenght}
      />

      <ImagesSlider imagenes={imagenesReclamo} />

      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          size={"large"}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              color="green"
              style={styles.buttons}
              // onPress={() => console.log("Pressed")}
              onPress={handleCrearReclamo}
            >
              Crear
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              color="red"
              style={styles.buttons}
              onPress={handleCancelar}
            >
              Cancelar
            </Button>
          </View>
        </View>
      )}
      <Portal>
        <Dialog visible={visibleAprobar} onDismiss={hideDialogAprobar}>
          {isSuccess ? (
            <View>
              <Dialog.Title>Reclamo registrado!</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Registramos el reclamo correctamente con el numero:{" "}
                  {idReclamoCreado}
                </Paragraph>
              </Dialog.Content>
            </View>
          ) : (
            <View>
              <Dialog.Title>Ups! Hubo un problema! </Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Lamentablemente hubo un problema al intentar registrar el
                  reclamo.{" "}
                </Paragraph>
                <Paragraph>
                  Por favor, pasale el siguiente detalle al administrador:{" "}
                  {errorDetail}
                </Paragraph>
              </Dialog.Content>
            </View>
          )}
          <Dialog.Actions>
            <Button onPress={() => handleCerrarDialogSuccess()}>OK</Button>
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
  tituloReclamo: {
    color: "red",
    fontWeight: "bold",
    textAlignVertical: "top",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
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
    marginBottom: 25,
  },
});

export default CrearReclamoScreen;
