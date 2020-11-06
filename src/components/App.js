import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./home/HomeScreen";
import ReclamosScreen from "./reclamos/ReclamosScreen";
import AprobarReclamoScreen from "./reclamos/AprobarReclamoScreen";
import CrearReclamoScreen from "./reclamos/CrearReclamoScreen";
import InspeccionarReclamoScreen from "./reclamos/InspeccionarReclamoScreen";
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const loggedUserInfo = {
  nombre: "Sebastian",
  apellido: "Monti",
  dni: 36826858,
  tipo: "cliente",
  reclamosEnCurso: [
    {
      id: 1,
      titulo: "Boton ascensor roto 5to piso",
      descripcion: "Se encontró que el boton del 5to piso no está funcionando, impidiendo solicitar el ascensor",
      estado: "INSPECCIÓN"
    },
    {
      id: 2,
      titulo: "Rajadura de mamposteria",
      descripcion: "Actualmente la unidad funcional se encuentra con una rajadura interna",
      estado: "INSPECCIÓN"
    },
    {
      id: 3,
      titulo: "Rajadura de mamposteria",
      descripcion: "Actualmente la unidad funcional se encuentra con una rajadura interna",
      estado: "INSPECCIÓN"
    }
  ]
};

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#e8ded2',
    background: '#e8ded2',
    accent: '#5eaaa8',
    surface: '#a3d2ca',
  }
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <NavigationContainer>
          {/*           <Appbar.Header>
            <Appbar.Action
              icon="menu"
              onPress={() => props.navigation.openDrawer()}
            />
            <Appbar.Content title="Administrador de consorcios" />
          </Appbar.Header> */}
          <Drawer.Navigator initialRouteName="Inicio" >
            <Drawer.Screen name="Inicio">
              {props => <HomeScreen {...props} userInfo={loggedUserInfo} />}
            </Drawer.Screen>
            <Drawer.Screen name="Crear reclamo" component={CrearReclamoScreen} />
            <Drawer.Screen name="Listado reclamos">
              {props => <ReclamosScreen {...props} userInfo={loggedUserInfo} />}
            </Drawer.Screen>
            <Drawer.Screen name="Aprobacion reclamos" component={AprobarReclamoScreen} />
            <Drawer.Screen name="Reclamos a validar" component={InspeccionarReclamoScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#e8ded2'
  }
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