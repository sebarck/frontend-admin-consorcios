import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const LoginScreen = ({ navigation, userInfo }) => {

    const [userText, setUserText] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");

    const adminUser = {
        email: "ro.dominici@gmail.com",
        password: "admin123"
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={{ width: 160, height: 160 }} source={require('../images/logo2.png')} />
                <Text style={styles.logoText}>TuConsorcio</Text>
            </View>
            <View style={styles.containerInputs}>
                <TextInput
                    label="Usuario"
                    value={userText}
                    onChangeText={userText => setUserText(userText)}
                />
                <TextInput
                    label="Contrasena"
                    value={userPassword}
                    secureTextEntry={true}
                    onChangeText={userPassword => setUserPassword(userPassword)}
                />
                <Button mode="contained" onPress={() => console.log("Login")}>INGRESAR</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    containerLogo: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    containerInputs: {
        justifyContent: 'space-around',
        flex: 1,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 100
    }
});

export default LoginScreen;

