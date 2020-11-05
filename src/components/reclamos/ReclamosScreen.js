import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import UltReclamosScreen from './UltReclamosScreen';

const ReclamosScreen = (props) => {
    return (
        <View style={styles.list}>
            <UltReclamosScreen />
            <List.Section>
                <List.Subheader>Reclamos cerrados</List.Subheader>
            </List.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#e8ded2'
    }
});

export default ReclamosScreen;