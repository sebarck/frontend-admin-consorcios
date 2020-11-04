import React from 'react';
import { View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import UltReclamosScreen from '../reclamos/UltReclamosScreen';
import ReclamosEnCursoText from './utils/ReclamosEnCursoText';

const HomeScreen = (props) => {
    return (
        <View>
            <Card>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                    <Title>Bienvenido, {props.userInfo.nombre}!</Title>
                    <ReclamosEnCursoText reclamosEnCurso={props.userInfo.reclamosEnCurso.length} />
                </Card.Content>
            </Card>

            <UltReclamosScreen />
        </View>
    );
}

export default HomeScreen;