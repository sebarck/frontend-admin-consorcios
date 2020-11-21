import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import UltReclamosScreen from './UltReclamosScreen';

const ReclamosScreen = (props) => {
    return (
        <ScrollView style={styles.list}>
            <UltReclamosScreen userInfo={props.userInfo} cantVisible={100} navigation={props.navigation} />
            <List.Section style={{flex:6}}>
                <List.Subheader>Reclamos cerrados</List.Subheader>
            </List.Section>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});

export default ReclamosScreen;