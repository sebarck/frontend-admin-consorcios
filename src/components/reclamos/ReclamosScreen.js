import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';

const ReclamosScreen = (props) => {
    return (
        <View>
            <List.Section>
                <List.Subheader >Reclamos en curso</List.Subheader>
                <List.Item
                    title="Boton ascensor roto 5to piso"
                    description="Se encontró que el boton del 5to piso no está funcionando, impidiendo solicitar el ascensor"
                    left={() => <Text style={styles.status}>INSPECCION</Text>}
                    right={() => <List.Icon icon="eye-outline" />} />
            </List.Section>
            <List.Section>
                <List.Subheader>Reclamos cerrados</List.Subheader>
            </List.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    status: {
        color: "red",
        fontWeight: "bold",
        textAlignVertical: "center",
        textAlign: "center"
    }
});

export default ReclamosScreen;