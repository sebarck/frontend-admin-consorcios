import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Subheading, Title } from 'react-native-paper';
import ChipsFiltrosEstado from './listado/ChipsFiltrosEstado';
import UltReclamosScreen from './UltReclamosScreen';

const ReclamosScreen = (props) => {
    const [estadoFilter, setEstadoFilter] = React.useState("");

    const handleFilter = (estado) => {
        if (estado != "") {
            setEstadoFilter(`?estado=${estado}`);
        } else {
            setEstadoFilter("");
        }
    }

    return (
        <ScrollView style={styles.list}>
            <Title style={{ padding: 10 }}>Listado de reclamos</Title>
            <Subheading style={{ padding: 10 }}>Filtros por estado</Subheading>
            <ChipsFiltrosEstado onPressFun={handleFilter} />
            <UltReclamosScreen userInfo={props.userInfo} cantVisible={100} navigation={props.navigation} filter={estadoFilter} />
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