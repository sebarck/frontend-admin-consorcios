import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const ChipsFiltrosEstado = () => {
    return (
        <View style={styles.chipsContainer}>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="check-circle-outline"
                onPress={() => console.log('Filtro por aprobado')}>
                Aprobados
            </Chip>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="new-box"
                onPress={() => console.log('Filtro por aprobado')}>
                Nuevos
            </Chip>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="eye-check-outline"
                onPress={() => console.log('Filtro por aprobado')}>
                Validados
            </Chip>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="close-circle-outline"
                onPress={() => console.log('Filtro por aprobado')}>
                Rechazados
            </Chip>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="progress-check"
                onPress={() => console.log('Filtro por aprobado')}>
                Cerrados
        </Chip>
        </View>
    );
}

const styles = StyleSheet.create({
    chipsContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#e8ded2',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    chip: {
        marginBottom: 10
    }
});

export default ChipsFiltrosEstado;