import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import UltReclamosScreen from './UltReclamosScreen';

const ReclamosScreen = (props) => {
    return (
        <View>
            <UltReclamosScreen />
            <List.Section>
                <List.Subheader>Reclamos cerrados</List.Subheader>
            </List.Section>
        </View>
    );
}

export default ReclamosScreen;