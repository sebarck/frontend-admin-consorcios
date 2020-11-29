import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,Button,TextInput} from 'react-native';

const LoginScreen = ({navigation,userInfo}) => {
    console.log(userInfo);

    const adminUser={
        email:"ro.dominici@gmail.com",
        password: "admin123"    }
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>  
                <Image style={{width:160, height:160}} source={require('../images/logo2.png')} />
                <Text style={styles.logoText}>TuConsorcio</Text>
            </View>

            <View style={styles.containerButtons}>
                <TextInput style={styles.inputbox} 
                        placeholder='Email'
                        placeholderTextColor="#ffffff"
                        keyboardType="email-address" 
                        selectionColor="#ffff"/>

                <TextInput style={styles.inputbox} 
                        placeholder='Contreña'
                        placeholderTextColor="#ffffff"
                        secureTextEntry={true} />

                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            

        </View>
        

        

    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#2196f3',
        flexGrow:1,
        alignItems:'center',
        justifyContent:'flex-end',
    },
    containerLogo:{
        alignItems:'center',
        flexGrow:1,
        marginVertical:20,
        justifyContent: 'flex-end',

    },
    containerButtons:{
        alignItems:'center',
        flexGrow:1,
        marginVertical:15,

    },
    logoText:{
        color:'#ffffff',
        fontSize:20,
        marginVertical:15,
        fontFamily:'Open Sans',
        fontWeight:'bold'
        },
    inputbox:{
        width:300,
        backgroundColor:'#63a4ff',
        borderRadius:5,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical:10,
        fontFamily:'Open Sans',

    },
    button:{

        width:300,
        backgroundColor:'#0069c0',
        borderRadius:25,
        paddingVertical:12,
        marginVertical:12,


    },
    buttonText:{
        color:'#ffffff',
        fontSize:18,
        fontWeight:'500',
        textAlign:'center',


    }


});

export default LoginScreen;

