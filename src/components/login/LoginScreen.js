import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import backendAdminConsorcios from '../../apis/backendAdminConsorcios';
import base64 from 'react-native-base64';

const LoginScreen = ({ navigation }) => {

    const [userText, setUserText] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loggedUserInfo, setLoggedUserInfo] = useState("");

    const handleLogin = () => {
        setIsLoading(true);
        const authHeader = 'Basic ' + base64.encode(`${userText}:${userPassword}`);
        backendAdminConsorcios
            .get(`/usuarios/${userText}`, {
                headers: { 'Authorization': authHeader }
            })
            .then((response) => {
                setLoggedUserInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
                navigation.navigate("Inicio", { loggedUserInfo: loggedUserInfo });
            });
    }

    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={require('../images/login-background.jpg')}
            blurRadius={1}
        >
            <View style={styles.container}>
                <View style={styles.containerLogo}>
                    <Image style={styles.logo} source={require('../images/logo.png')} />
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
                    {isLoading
                        ? <ActivityIndicator animating={true} color={Colors.red800} size={"large"} />
                        : <Button mode="contained" onPress={() => handleLogin()}>INGRESAR</Button>
                    }
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
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
    logo: {
        flex: 3,
        tintColor: '#839b97',
        width: 160,
        height: 160
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

