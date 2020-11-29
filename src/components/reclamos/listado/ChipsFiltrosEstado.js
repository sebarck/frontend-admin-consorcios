import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const ChipsFiltrosEstado = ({ onPressFun }) => {
    return (
        <View style={styles.chipsContainer}>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="expand-all"
                onPress={() => onPressFun("")}
            >
                Todos
            </Chip>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="check-circle-outline"
                onPress={() => onPressFun("APROBADO")}
            >
                Aprobados
            </Chip>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="new-box"
                onPress={() => onPressFun("NUEVO")}
            >
                Nuevos
            </Chip>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="eye-check-outline"
                onPress={() => onPressFun("VALIDADO")}
            >
                Validados
            </Chip>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="close-circle-outline"
                onPress={() => onPressFun("RECHAZADO")}
            >
                Rechazados
            </Chip>
            <Chip
                style={styles.chip}
                mode="outlined"
                icon="progress-check"
                onPress={() => onPressFun("CERRADO")}
            >
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