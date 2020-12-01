import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Divider, List, Subheading, Text } from 'react-native-paper';

const ReclamosAbiertosList = (props) => {

    const handleDetalle = (reclamo) => {
        props.navigation.navigate("Detalle", { reclamo: reclamo })
    }

    if (props.reclamos.length > 0) {
        return props.reclamos.slice(0, props.cantVisible).map((reclamo) => {
            return (
                <ScrollView key={reclamo.id}>
                    <List.Item
                        title={reclamo.titulo}
                        description={reclamo.descripcion}
                        left={() => <Text style={styles.status}>{reclamo.estado}</Text>}
                        right={() => <List.Icon icon="eye-outline" />}
                        onPress={() => { handleDetalle(reclamo) }}
                        key={reclamo.id}
                    />
                    <Divider />
                </ScrollView>
            );
        });
    } else {
        return (
            <View style={{ alignItems: "center" }} >
                <Subheading style={{ fontWeight: 'bold' }}>No tenés reclamos en este estado! :)</Subheading>
            </View>
        );
    }
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