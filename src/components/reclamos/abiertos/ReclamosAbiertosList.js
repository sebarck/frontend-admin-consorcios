import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';

const ReclamosAbiertosList = (props) => {
    return props.reclamos.map((reclamo) => {
        return (
            <View>
                <List.Item
                    title={reclamo.titulo}
                    description={reclamo.descripcion}
                    left={() => <Text style={styles.status}>{reclamo.estado}</Text>}
                    right={() => <List.Icon icon="eye-outline" />}
                    key={reclamo.id}
                    />
            </View>
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