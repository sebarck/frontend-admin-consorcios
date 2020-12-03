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
import moment from "moment";

const DetalleReclamoScreen = (props) => {
  const { params } = props.route;
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoading1, setIsLoading1] = React.useState(false);
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

  const [textMotivoRechazo, setTextMotivoRechazo] = React.useState("");

  const [textNotaAprobacionAdmin, setTextNotaAprobacionAdmin] = React.useState(
    ""
  );

  const [visibleAprobar, setVisibleAprobar] = React.useState(false);
  const showDialogAprobar = () => setVisibleAprobar(true);
  const hideDialogAprobar = () => setVisibleAprobar(false);

  const [visibleAlertRechazo, setVisibleAlertRechazo] = React.useState(false);
  const showAlertRechazoAdmin = () => {
    setVisibleAlertRechazo(true);
    console.log("Rechazo de administrador");
  };

  const hideAlertRechazo = (reclamo) => {
    setVisibleAlertRechazo(false);
    hideDialogRechazarInspec();
    hideDialogRechazarAdmin();
    props.navigation.navigate("Detalle", { reclamo: reclamo });
  };

  const [visibleAlertAprobado, setVisibleAlertAprobado] = React.useState(false);
  const showAlertAprobado = () => {
    setVisibleAlertAprobado(true);
  };
  const hideAlertAprobado = (reclamo) => {
    setVisibleAlertAprobado(false);
    hideDialogAprobar();
    props.navigation.navigate("Detalle", { reclamo: reclamo });
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
          console.log(response.data.fechaResolucion);
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

  const [dateString, setDateString] = React.useState("");

  var day = moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");

  const postBodyRechazo = JSON.stringify({
    id: detalleReclamo.id,
    notas: textMotivoRechazo,
  });

  const postBodyAprobarAdmin = JSON.stringify({
    id: detalleReclamo.id,
    notas: textNotaAprobacionAdmin,
    fechaResolucion: day,
  });

  const handleAprobarAdmin = async () => {
    setIsLoading1(true);
    backendAdminConsorcios
      .post(`/reclamos/aprobaciones/${detalleReclamo.id}`, postBodyAprobarAdmin)
      .then((response) => {
        console.log(day);
        setIsLoading1(false);
        showAlertAprobado();
        setTextNotaAprobacionAdmin("");
        setDateString("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRechazar = async () => {
    setIsLoading1(true);
    backendAdminConsorcios
      .post(`/reclamos/rechazos/${detalleReclamo.id}`, postBodyRechazo)
      .then((response) => {
        setIsLoading1(false);
        showAlertRechazoAdmin();
        setTextMotivoRechazo("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

                  {!(detalleReclamo.propiedad.id == "") && (
                    <List.Item
                      title={`Piso ${detalleReclamo.propiedad.piso}, unidad ${detalleReclamo.propiedad.unidad}`}
                      left={(props) => (
                        <List.Icon {...props} icon="home-variant" />
                      )}
                    />
                  )}

                  {(detalleReclamo.propiedad.id == "") && (
                    <List.Item
                      title="Área común"
                      left={(props) => (
                        <List.Icon {...props} icon="home-group" />
                      )}
                    />
                  )}

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
                  {!(detalleReclamo.notas == null) && (
                    <List.Item
                      title="Notas"
                      description={detalleReclamo.notas}
                      left={(props) => <List.Icon {...props} icon="note" />}
                    />
                  )}

                  <List.Item
                    title="Fecha de creación"
                    description={detalleReclamo.fechaCreacion}
                    left={(props) => (
                      <List.Icon {...props} icon="calendar-month-outline" />
                    )}
                  />
                  <List.Item
                    title="Fecha de resolución"
                    description={
                      detalleReclamo.fechaResolucion || "No definida"
                    }
                    left={(props) => (
                      <List.Icon {...props} icon="calendar-check-outline" />
                    )}
                  />
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <ImagesSlider imagenes={images} />
                  </View>
                </Card.Content>

                {/* Si está validado y es ADMIN, puede ver aprobar o rechazar
                 detalleReclamo.estado == "VALIDADO" && */}
                {params.loggedUserInfo.rol == "ADMIN" && (
                  <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={showDialogAprobar}>
                      Aprobar
                    </Button>
                    <Button mode="contained" onPress={showDialogRechazarAdmin}>
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
                        onPress={showDialogRechazarAdmin}
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
        <Dialog visible={visibleAprobar} onDismiss={hideDialogAprobar}>
          <Dialog.Title>Fecha de resolución</Dialog.Title>
          <Paragraph>formato DD/MM/YYYY</Paragraph>
          <Dialog.Content>
            <TextInput
              value={dateString}
              onChangeText={(dateString) => setDateString(dateString)}
              style={styles.fechaResolucionReclamo}
            />
          </Dialog.Content>
          <Dialog.Title>Comentario</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={textNotaAprobacionAdmin}
              onChangeText={(textNotaAprobacionAdmin) =>
                setTextNotaAprobacionAdmin(textNotaAprobacionAdmin)
              }
              style={styles.comentarioResolucionReclamo}
              multiline={true}
            />
          </Dialog.Content>
          {!isLoading1 ? (
            <Dialog.Actions>
              <Button color="black" onPress={hideDialogAprobar}>
                Cancel
              </Button>
              <Button color="black" onPress={() => handleAprobarAdmin()}>
                Ok
              </Button>
            </Dialog.Actions>
          ) : (
            <ActivityIndicator animating={true} size={"small"} />
          )}
          <Paragraph></Paragraph>
        </Dialog>

        <Dialog
          visible={visibleRechazarAdmin}
          onDismiss={hideDialogRechazarAdmin}
        >
          <Dialog.Title>Motivo de rechazo</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={textMotivoRechazo}
              onChangeText={(textMotivoRechazo) =>
                setTextMotivoRechazo(textMotivoRechazo)
              }
              style={styles.comentarioResolucionReclamo}
              multiline={true}
            />
          </Dialog.Content>
          {!isLoading1 ? (
            <Dialog.Actions>
              <Button color="black" onPress={hideDialogRechazarAdmin}>
                Cancel
              </Button>
              <Button color="black" onPress={() => handleRechazar()}>
                Ok
              </Button>
            </Dialog.Actions>
          ) : (
            <ActivityIndicator animating={true} size={"small"} />
          )}
          <Paragraph></Paragraph>
        </Dialog>
        <Dialog
          visible={visibleAlertRechazo}
          onDismiss={() => hideAlertRechazo(detalleReclamo)}
        >
          <Dialog.Title>Reclamo rechazado</Dialog.Title>
          <Dialog.Actions>
            <Button
              color="black"
              onPress={() => hideAlertRechazo(detalleReclamo)}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={visibleAlertAprobado}
          onDismiss={() => hideAlertAprobado(detalleReclamo)}
        >
          <Dialog.Title>Reclamo aprobado</Dialog.Title>
          <Dialog.Actions>
            <Button
              color="black"
              onPress={() => hideAlertAprobado(detalleReclamo)}
            >
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
