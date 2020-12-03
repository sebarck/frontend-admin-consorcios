import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors, List, Subheading } from 'react-native-paper';
import backendAdminConsorcios from '../../apis/backendAdminConsorcios';
import ReclamosAbiertosList from './listado/ReclamosAbiertosList';

const UltReclamosScreen = (props) => {
    const [reclamosEnCurso, setReclamosEnCurso] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { loggedUserInfo } = props;

    if(loggedUserInfo.rol === "ADMIN")
    loggedUserInfo.persona.id = loggedUserInfo.edificios[0].id;

    const buildUrlReclamos = () => {
        if (loggedUserInfo.rol === "USER") {
            return '/reclamos/viviente/';
        } else if (loggedUserInfo.rol === "ADMIN") {
            return '/reclamos/administrador/';
        } else {
            return '/reclamos/inspector/';
        }
    }

    const optionsBuilder = (props) => {
        if (typeof (props.filter) === "undefined") {
            return "";
        } else {
            return props.filter;
        }
    }

    useEffect(() => {
        var url = buildUrlReclamos();
        var options = optionsBuilder(props);
        const obtenerReclamos = async (loggedUserInfo) => {
            backendAdminConsorcios
                .get(url + loggedUserInfo.persona.id + options)
                .then((response) => {
                    setReclamosEnCurso(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setIsLoading(false));
        };
        obtenerReclamos(loggedUserInfo);

        return () => {
            setReclamosEnCurso([]);
            setIsLoading(true);
        };

    }, [props])

    return (
        <ScrollView style={styles.list}>
            <List.Section>
                <List.Subheader>Reclamos</List.Subheader>
                {isLoading
                    ? (
                        <View style={{ alignItems: 'center' }}>
                            <Subheading style={{ fontWeight: 'bold' }}>Estamos recuperando tus reclamos</Subheading>
                            <ActivityIndicator animating={true} color={Colors.red800} size={"small"} />
                        </View>
                    )
                    : <ReclamosAbiertosList
                        reclamos={reclamosEnCurso}
                        cantVisible={props.cantVisible}
                        navigation={props.navigation}
                        loggedUserInfo={loggedUserInfo} />
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