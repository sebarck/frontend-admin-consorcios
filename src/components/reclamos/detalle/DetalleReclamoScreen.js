import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, Card, List, Subheading, Surface } from 'react-native-paper';
import backendAdminConsorcios from '../../../apis/backendAdminConsorcios';

const DetalleReclamoScreen = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [detalleReclamo, setDetalleReclamo] = React.useState("");

    useEffect(() => {
        let mounted = true;

        async function ObtenerReclamoPorId(props) {
            setIsLoading(true);
            backendAdminConsorcios.get('/reclamos/' + props.route.params.reclamo.id, {
                "headers": {
                    "content-type": "application/json"
                }
            }).then((response) => {
                //console.log(response.data);
                if (mounted) {
                    setDetalleReclamo(response.data);
                    setIsLoading(false);
                }
            }).catch((error) => {
                setIsLoading(false);
                console.log(error.response.data.error)
            }
            )
        };

        ObtenerReclamoPorId(props);

        return () => mounted = false;

    }, [props]);

    return (
        <View style={{ flex: 1 }}>
            <Surface style={styles.surface}>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    {isLoading
                        ? (
                            <View style={{ flex: 1, alignItems: 'center', width: 350 }}>
                                <Subheading style={styles.loadingInfo}>Estamos recuperando el detalle de tu reclamo</Subheading>
                                <ActivityIndicator animating={true} size={"large"} />
                            </View>
                        )
                        : (<View style={{ flex: 1, width: 350 }}>
                            <Card.Title title={detalleReclamo.titulo} />
                            <ScrollView>
                                <Card.Content>
                                    <List.Item
                                        title={detalleReclamo.categoria}
                                        left={props => <List.Icon {...props} icon="hammer" />}
                                    />
                                    {typeof (detalleReclamo.edificio) !== 'undefined' &&
                                        <List.Item
                                            title={`${detalleReclamo.edificio.calle}, ${detalleReclamo.edificio.altura}, ${detalleReclamo.edificio.barrio}`}
                                            left={props => <List.Icon {...props} icon="home-city-outline" />}
                                        />
                                    }
                                    <List.Item
                                        title={detalleReclamo.descripcion}
                                        titleNumberOfLines={4}
                                        left={props => <List.Icon {...props} icon="clipboard-text-outline" />}
                                    />
                                    <List.Item
                                        title="Estado"
                                        description={detalleReclamo.estado}
                                        left={props => <List.Icon {...props} icon="progress-wrench" />}
                                    />
                                    <List.Item
                                        title="Fecha de creación"
                                        description={detalleReclamo.fechaCreacion}
                                        left={props => <List.Icon {...props} icon="calendar-month-outline" />}
                                    />
                                    <List.Item
                                        title="Fecha comienzo de obras"
                                        description={detalleReclamo.fechaComienzoObras || "No asignada"}
                                        left={props => <List.Icon {...props} icon="calendar-clock" />}
                                    />
                                    <List.Item
                                        title="Fecha de resolución"
                                        description={detalleReclamo.fechaResolucion || "No finalizado"}
                                        left={props => <List.Icon {...props} icon="calendar-check-outline" />}
                                    />
                                </Card.Content>
                                <View style={styles.buttonContainer}>
                                    <Button mode="contained" onPress={() => console.log("Aprobado")}>
                                        Aprobar
                                    </Button>
                                    <Button mode="contained" onPress={() => console.log("Rechazado")}>
                                        Rechazar
                                    </Button>
                                </View>
                            </ScrollView>
                        </View>
                        )
                    }
                </Card>
            </Surface>
        </View>
    );
}

export default DetalleReclamoScreen;

const styles = StyleSheet.create({
    loadingInfo: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 40
    },
    surface: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: '#cfd3ce',
    },
    card: {
        elevation: 10
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 20
    }
});