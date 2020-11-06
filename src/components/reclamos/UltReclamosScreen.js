import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';
import ReclamosAbiertosList from './abiertos/ReclamosAbiertosList';

const UltReclamosScreen = (props) => {
    console.log(props);
    console.log(props.userInfo.reclamosEnCurso);
    return (
        <View style={styles.list}>
            <List.Section>
                <List.Subheader >Reclamos en curso</List.Subheader>
                <ReclamosAbiertosList reclamos={props.userInfo.reclamosEnCurso} />
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
    },
    list: {
        backgroundColor: '#e8ded2'
    }
});

export default UltReclamosScreen;