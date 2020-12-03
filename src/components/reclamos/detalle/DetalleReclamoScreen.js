import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Button,
  Card,
  List,
  Subheading,
  Surface,
  Paragraph,
  Dialog,
  TextInput,
  Portal,
} from "react-native-paper";
import backendAdminConsorcios from "../../../apis/backendAdminConsorcios";
import ImagesSlider from "../../imagesSlider/ImagesSlider";

const DetalleReclamoScreen = (props) => {
  const { params } = props.route;
  const [isLoading, setIsLoading] = React.useState(true);
  const [detalleReclamo, setDetalleReclamo] = React.useState("");
  const [images, setImages] = React.useState([]);

  const [visibleRechazarAdmin, setVisibleRechazarAdmin] = React.useState(false);
  const showDialogRechazarAdmin = () => setVisibleRechazarAdmin(true);
  const hideDialogRechazarAdmin = () => setVisibleRechazarAdmin(false);

  const [visibleRechazarInspec, setVisibleRechazarInspec] = React.useState(
    false
  );
  const showDialogRechazarInspec = () => setVisibleRechazarInspec(true);
  const hideDialogRechazarInspec = () => setVisibleRechazarInspec(false);

  const [visibleAprobar, setVisibleAprobar] = React.useState(false);
  const showDialogAprobar = () => setVisibleAprobar(true);
  const hideDialogAprobar = () => setVisibleAprobar(false);

  const [visibleAlertRechazo, setVisibleAlertRechazo] = React.useState(false);
  const showAlertRechazoAdmin = () => {
    setVisibleAlertRechazo(true);
    console.log("Rechazo de administrador");
  };
  const showAlertRechazoInspec = () => {
    setVisibleAlertRechazo(true);
    console.log("Rechazo de inspector");
  };
  const hideAlertRechazo = (reclamo) => {
    setVisibleAlertRechazo(false);
    hideDialogRechazarInspec();
    hideDialogRechazarAdmin();
    props.navigation.navigate("Detalle", { reclamo: reclamo })
  };
  
  const [visibleAlertAprobado, setVisibleAlertAprobado] = React.useState(false);
  const showAlertAprobado = () => {
    setVisibleAlertAprobado(true);
  };
  const hideAlertAprobado = (reclamo) => {
    setVisibleAlertAprobado(false);
    hideDialogAprobar();
    props.navigation.navigate("Detalle", { reclamo: reclamo })
  };

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

  const handleAccionInspeccionar = (reclamo) => {
    console.log("Reclamo a inspeccionar");
    props.navigation.navigate("Reclamos a validar", { reclamo: reclamo });
  };

  const postBody = JSON.stringify({
    id: detalleReclamo.id,
  });

  const handleAprobarAdmin = async () => {
    backendAdminConsorcios
      .post(`/reclamos/aprobaciones/${detalleReclamo.id}`, postBody)
      .then((response) => {
        showAlertAprobado();
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <Surface style={styles.surface}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          {isLoading ? (
            <View style={{ flex: 1, alignItems: "center", width: 350 }}>
              <Subheading style={styles.loadingInfo}>
                Estamos recuperando el detalle de tu reclamo
              </Subheading>
              <ActivityIndicator animating={true} size={"large"} />
            </View>
          ) : (
            <View style={{ flex: 1, width: 350 }}>
              <Card.Title title={detalleReclamo.titulo} />
              <ScrollView>
                <Card.Content>
                  <List.Item
                    title={detalleReclamo.categoria}
                    left={(props) => <List.Icon {...props} icon="hammer" />}
                  />
                  <List.Item
                    title={`${detalleReclamo.edificio.calle}, ${detalleReclamo.edificio.altura}, ${detalleReclamo.edificio.barrio}`}
                    left={(props) => (
                      <List.Icon {...props} icon="home-city-outline" />
                    )}
                  />
                  <List.Item
                    title={detalleReclamo.descripcion}
                    titleNumberOfLines={4}
                    left={(props) => (
                      <List.Icon {...props} icon="clipboard-text-outline" />
                    )}
                  />
                  <List.Item
                    title="Estado"
                    description={detalleReclamo.estado}
                    left={(props) => (
                      <List.Icon {...props} icon="progress-wrench" />
                    )}
                  />
                  <List.Item
                    title="Fecha de creación"
                    description={detalleReclamo.fechaCreacion}
                    left={(props) => (
                      <List.Icon {...props} icon="calendar-month-outline" />
                    )}
                  />
                  <List.Item
                    title="Fecha comienzo de obras"
                    description={
                      detalleReclamo.fechaComienzoObras || "No asignada"
                    }
                    left={(props) => (
                      <List.Icon {...props} icon="calendar-clock" />
                    )}
                  />
                  <List.Item
                    title="Fecha de resolución"
                    description={
                      detalleReclamo.fechaResolucion || "No finalizado"
                    }
                    left={(props) => (
                      <List.Icon {...props} icon="calendar-check-outline" />
                    )}
                  />
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <ImagesSlider imagenes={images} />
                  </View>
                </Card.Content>

                {/* Si está validado y es ADMIN, puede ver aprobar o rechazar */}
                {params.loggedUserInfo.rol == "ADMIN" &&
                  detalleReclamo.estado == "VALIDADO" && (
                    <View style={styles.buttonContainer}>
                      <Button mode="contained" onPress={showDialogAprobar}>
                        Aprobar
                      </Button>
                      <Button
                        mode="contained"
                        onPress={showDialogRechazarAdmin}
                      >
                        Rechazar
                      </Button>
                    </View>
                  )}

                {/* Si es nuevo y es INSPEC, puede ver Procesar o Rechazar */}
                {params.loggedUserInfo.rol == "INSPECTOR" &&
                  detalleReclamo.estado == "NUEVO" && (
                    <View style={styles.buttonContainer}>
                      <Button
                        mode="contained"
                        onPress={() => {
                          handleAccionInspeccionar(detalleReclamo);
                        }}
                      >
                        Procesar
                      </Button>
                      <Button
                        mode="contained"
                        onPress={showDialogRechazarInspec}
                      >
                        Rechazar
                      </Button>
                    </View>
                  )}
              </ScrollView>
            </View>
          )}
        </Card>
      </Surface>

      <Portal>
        <Dialog
          visible={visibleRechazarInspec}
          onDismiss={hideDialogRechazarInspec}
        >
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
            <Button color="black" onPress={hideDialogRechazarInspec}>
              Cancel
            </Button>
            <Button color="black" onPress={showAlertRechazoInspec}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>

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
            <Button color="black" onPress={hideDialogAprobar}>
              Cancel
            </Button>
            <Button color="black" onPress={() => handleAprobarAdmin()}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          visible={visibleRechazarAdmin}
          onDismiss={hideDialogRechazarAdmin}
        >
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
            <Button color="black" onPress={hideDialogRechazarAdmin}>
              Cancel
            </Button>
            <Button color="black" onPress={showAlertRechazoAdmin}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={visibleAlertRechazo} onDismiss={() => hideAlertRechazo(detalleReclamo)}>
          <Dialog.Title>Reclamo rechazado</Dialog.Title>
          <Dialog.Actions>
            <Button color="black" onPress={() => hideAlertRechazo(detalleReclamo)}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={visibleAlertAprobado} onDismiss={() => hideAlertAprobado(detalleReclamo)}>
          <Dialog.Title>Reclamo aprobado</Dialog.Title>
          <Dialog.Actions>
            <Button color="black" onPress={() => hideAlertAprobado(detalleReclamo)}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DetalleReclamoScreen;

const styles = StyleSheet.create({
  loadingInfo: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 40,
  },
  surface: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "#cfd3ce",
  },
  card: {
    elevation: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
});
