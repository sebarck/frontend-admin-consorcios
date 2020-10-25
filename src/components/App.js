import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Reclamos from './reclamos/Reclamos';

export default function App() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Administrador de consorcios" />
      </Appbar.Header>
      <Reclamos />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
