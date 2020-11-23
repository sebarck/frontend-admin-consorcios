import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors, List, Subheading, Text } from 'react-native-paper';
import backendAdminConsorcios from '../../apis/backendAdminConsorcios';
import ReclamosAbiertosList from './abiertos/ReclamosAbiertosList';

const UltReclamosScreen = (props) => {
    const [reclamosEnCurso, setReclamosEnCurso] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    // console.log(props);
    // console.log(props.userInfo.reclamosEnCurso);
    const urlReclamos = (props) => {
        if (props.userInfo.tipo === "USER") {
            return '/reclamos/viviente/';
        } else if (props.userInfo.tipo === "ADMIN"){
            return '/reclamos/administrador/';
        } else {
            return '/reclamos/inspector/';
        }
    }

    useEffect(() => {
        let mounted = true;

        async function ObtenerReclamosViviente(props) {
            setIsLoading(true);
            var url = urlReclamos(props);
            backendAdminConsorcios.get(url + props.userInfo.idViviente, {
                "headers": {
                    "content-type": "application/json"
                }
            }).then((response) => {
                //console.log(response.data);
                if (mounted) {
                    setReclamosEnCurso(response.data);
                    setIsLoading(false);
                }
            }).catch((error) => {
                setIsLoading(false);
                console.log(error.response.data.error)
            }
            )
        };

        ObtenerReclamosViviente(props);

        return () => mounted = false;

    }, [props]);

    return (
        <ScrollView style={styles.list}>
            <List.Section>
                <List.Subheader>Reclamos en curso</List.Subheader>
                {isLoading
                    ? (
                        <View style={{alignItems: 'center'}}>
                            <Subheading style={{fontWeight: 'bold'}}>Estamos recuperando tus reclamos</Subheading>
                            <ActivityIndicator animating={true} color={Colors.red800} size={"small"} />
                        </View>
                    )
                    : <ReclamosAbiertosList reclamos={reclamosEnCurso} cantVisible={props.cantVisible} navigation={props.navigation} />
                }
            </List.Section>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    flex: 1,
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