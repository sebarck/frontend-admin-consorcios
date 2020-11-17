import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import UltReclamosScreen from './UltReclamosScreen';

const ReclamosScreen = ({userInfo}) => {
    console.log(userInfo);
    return (
        <ScrollView style={styles.list}>
            <UltReclamosScreen userInfo={userInfo} cantVisible={100} />
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