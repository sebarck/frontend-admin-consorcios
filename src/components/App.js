import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./home/HomeScreen";
import ReclamosScreen from "./reclamos/ReclamosScreen";
import { Provider as PaperProvider } from 'react-native-paper';
import AprobarReclamoScreen from "./reclamos/AprobarReclamoScreen";
import CrearReclamoScreen from "./reclamos/CrearReclamoScreen";
import InspeccionarReclamoScreen from "./reclamos/InspeccionarReclamoScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './home/HomeScreen';
import ReclamosScreen from './reclamos/ReclamosScreen';

const loggedUserInfo = {
  nombre: "Sebastian",
  apellido: "Monti",
  dni: 36826858,
  reclamosEnCurso: [
    {
      id: 1,
      titulo: "Boton ascensor roto 5to piso",
      descripcion: "Se encontró que el boton del 5to piso no está funcionando, impidiendo solicitar el ascensor",
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
          <Drawer.Navigator initialRouteName="Inicio" >
            <Drawer.Screen name="Inicio">
              {props => <HomeScreen {...props} userInfo={loggedUserInfo} />}
            </Drawer.Screen>
            <Drawer.Screen name="Listado reclamos" component={ReclamosScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
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