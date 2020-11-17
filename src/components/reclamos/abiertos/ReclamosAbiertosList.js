import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';

const ReclamosAbiertosList = (props) => {
    return props.reclamos.slice(0, props.cantVisible).map((reclamo) => {
        return (
            <ScrollView>
                <List.Item
                    title={reclamo.titulo}
                    description={reclamo.descripcion}
                    left={() => <Text style={styles.status}>{reclamo.estado}</Text>}
                    right={() => <List.Icon icon="eye-outline" />}
                    onPress={() => props.navigation.navigate("Detalle", { reclamo: reclamo })}
                    key={reclamo}
                />
                <Divider />
            </ScrollView>
        );
    });
};

const styles = StyleSheet.create({
    status: {
        color: "red",
        fontWeight: "bold",
        textAlignVertical: "center",
        textAlign: "center"
    },
});

export default ReclamosAbiertosList;