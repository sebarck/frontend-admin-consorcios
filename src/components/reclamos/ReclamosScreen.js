import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Chip, List, Paragraph, Subheading, Title } from 'react-native-paper';
import ChipsFiltrosEstado from './listado/ChipsFiltrosEstado';
import UltReclamosScreen from './UltReclamosScreen';

const ReclamosScreen = (props) => {
    return (
        <ScrollView style={styles.list}>
            <Title style={{ padding: 10 }}>Listado de reclamos</Title>
            <Subheading style={{ padding: 10 }}>Filtros por estado</Subheading>
            <ChipsFiltrosEstado />
            <UltReclamosScreen userInfo={props.userInfo} cantVisible={100} navigation={props.navigation} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#e8ded2'
    }
});

export default ReclamosScreen;