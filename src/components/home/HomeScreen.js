import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, FAB, Paragraph, Title } from "react-native-paper";
import UltReclamosScreen from "../reclamos/UltReclamosScreen";

const HomeScreen = ({ navigation, userInfo, route, handleUserInfo }) => {
  const { loggedUserInfo } = route.params;
  switch (loggedUserInfo.rol) {
    case "USER":
      loggedUserInfo.persona = loggedUserInfo.viviente;
      handleUserInfo(loggedUserInfo.rol);
      break;
    case "ADMIN":
      loggedUserInfo.persona = loggedUserInfo.administrador;
      loggedUserInfo.edificios = loggedUserInfo.administrador.edificios;
      handleUserInfo(loggedUserInfo.rol);
      break;
    case "INSPECTOR":
      loggedUserInfo.persona = loggedUserInfo.inspector;
      handleUserInfo(loggedUserInfo.rol);
      break;
  }

  

  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Title>Bienvenido, {loggedUserInfo.persona.nombre}!</Title>
          <Paragraph>Tu perfil es {loggedUserInfo.rol}! :)</Paragraph>
        </Card.Content>
      </Card>
      <UltReclamosScreen
        userInfo={userInfo}
        cantVisible={3}
        navigation={navigation}
        loggedUserInfo={loggedUserInfo}
      />
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("Listado reclamos", {
            loggedUserInfo: loggedUserInfo,
          })
        }
      >
        Ver todos
      </Button>

      {/* Solo el usuario puede "Crear nuevo reclamo" */}
      {loggedUserInfo.rol == "USER" && (
        <FAB
          style={style.fab}
          label="Crear nuevo reclamo"
          icon="pencil-plus-outline"
          onPress={() =>
            navigation.navigate("Crear reclamo", {
              loggedUserInfo: loggedUserInfo,
            })
          }
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  fab: {
    position: "relative",
    margin: 20,
  },
});

export default HomeScreen;
