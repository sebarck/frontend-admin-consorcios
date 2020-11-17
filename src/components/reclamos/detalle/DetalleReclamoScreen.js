import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Card, Colors, Paragraph, Subheading, Title } from 'react-native-paper';
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
        <ScrollView style={{ flex: 1 }}>
            <Card>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                {isLoading
                    ? (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Title style={{ fontWeight: 'bold', textAlign: 'center' }}>Estamos recuperando el detalle de tu reclamo</Title>
                            <ActivityIndicator animating={true} color={Colors.red800} size={"large"} />
                        </View>
                    )
                    : (<View style={{ flex: 1 }}>
                        <Card.Title title={detalleReclamo.titulo} />
                        <Card.Content>
                            <Paragraph>{detalleReclamo.descripcion}</Paragraph>
                        </Card.Content>
                    </View>
                    )
                }
            </Card>
        </ScrollView>
    );
}

export default DetalleReclamoScreen;