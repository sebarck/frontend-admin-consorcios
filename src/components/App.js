import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import HomeScreen from "./home/HomeScreen";
import ReclamosScreen from "./reclamos/ReclamosScreen";
import AprobarReclamoScreen from "./reclamos/AprobarReclamoScreen";
import CrearReclamoScreen from "./reclamos/CrearReclamoScreen";
import InspeccionarReclamoScreen from "./reclamos/InspeccionarReclamoScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import messaging from "@react-native-firebase/messaging";
import DetalleReclamoScreen from "./reclamos/detalle/DetalleReclamoScreen";
import LoginScreen from "./login/LoginScreen";

const loggedUserInfoHardcoded = {
  idViviente: 1,
  tipo: "USER",
};

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#c6b497",
    background: "#e8ded2",
    accent: "#34626c",
    surface: "#839b97",
  },
};

const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });
    console.disableYellowBox = true;

    return unsubscribe;
  }, []);

  const [tipoUsuario, setTipoUsuario] = React.useState("");

  function handleLoggedUserInfo(text) {
    setTipoUsuario(text);
    console.log("Seteo tipo de usuario");
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Logout">
            <Drawer.Screen name="Inicio">
              {(props) => (
                <HomeScreen
                  {...props}
                  userInfo={loggedUserInfoHardcoded}
                  handleUserInfo={(text) => handleLoggedUserInfo(text)}
                />
              )}
            </Drawer.Screen>
            {tipoUsuario == "USER" && (
              <Drawer.Screen
                name="Crear reclamo"
                component={CrearReclamoScreen}
              />
            )}
            <Drawer.Screen name="Listado reclamos">
              {(props) => (
                <ReclamosScreen {...props} userInfo={loggedUserInfoHardcoded} />
              )}
            </Drawer.Screen>

            {/* Si es usuario, no puede aprobar reclamos
            {(tipoUsuario !== "USER") && (
              <Drawer.Screen
                name="Aprobacion reclamos"
                component={AprobarReclamoScreen}
              />
            )} */}

            {/* Si es usuario, no puede inspeccionar reclamos */}
            {!(tipoUsuario == "USER") && (
              <Drawer.Screen
                name="Reclamos a validar"
                component={InspeccionarReclamoScreen}
              />
            )}

            <Drawer.Screen
              name="Detalle"
              options={{ drawerLabel: "Detalle Reclamos" }}
            >
              {(props) => (
                <DetalleReclamoScreen
                  {...props}
                  userInfo={loggedUserInfoHardcoded}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Logout">
              {(props) => <LoginScreen {...props} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e8ded2",
  },
});

/*           <Drawer.Section title="Admin Consorcios">
        <Drawer.Item
          icon="file-document-edit-outline"
          label="Nuevo reclamo"
        />
        <Drawer.Item
          icon="file-document-box-multiple-outline"
          label="Listado de reclamos"
        />
        <Drawer.Item
          icon="account-circle-outline"
          label="Mi Perfil"
        />
        <Drawer.Item
          icon="logout"
          label="Cerrar sesión"
        />
      </Drawer.Section> */

/*       <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={{ title: "Administrador de consorcios" }}>
        {props => <HomeScreen {...props} userInfo={loggedUserInfo} />}
      </Stack.Screen>
      <Stack.Screen name="Reclamos" component={ReclamosScreen} options={{ title: "Lista de reclamos" }} />
    </Stack.Navigator> */
