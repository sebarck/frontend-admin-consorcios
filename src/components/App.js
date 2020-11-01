import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './home/HomeScreen';
import ReclamosScreen from './reclamos/ReclamosScreen';

const loggedUserInfo = {
  nombre: "Sebastian",
  apellido: "Monti",
  dni: 36826858,
  reclamos: [
      {
          id: 1,
          titulo: "Boton ascensor roto 5to piso",
          descripcion: "Se encontró que el boton del 5to piso no está funcionando, impidiendo solicitar el ascensor",
          estado: "INSPECCIÓN"
      }
  ]
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Reclamos">
          <Stack.Screen name="Home" options={{ title: "Administrador de consorcios" }}>
            {props => <HomeScreen {...props} userInfo={loggedUserInfo} />}
          </Stack.Screen>
          <Stack.Screen name="Reclamos" component={ReclamosScreen} options={{ title: "Lista de reclamos" }} />
        </Stack.Navigator>
      </NavigationContainer>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
        container: {
        flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
  },
});
