import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, FAB, Title } from 'react-native-paper';
import UltReclamosScreen from '../reclamos/UltReclamosScreen';
import ReclamosEnCursoText from './utils/ReclamosEnCursoText';

const HomeScreen = ({ navigation, userInfo }) => {
    return (
        <View>
            <Card>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                    <Title>Bienvenido, {userInfo.nombre}!</Title>
                    <ReclamosEnCursoText reclamosEnCurso={userInfo.reclamosEnCurso.length} />
                </Card.Content>
            </Card>
            <UltReclamosScreen />
            <FAB
                style={style.fab}
                label="Crear nuevo reclamo"
                icon="pencil-plus-outline"
                onPress={() => navigation.navigate('Listado reclamos')}
            />
        </View>
    );
}

const style = StyleSheet.create({
    fab: {
        position: 'relative',
        margin: 60,
      }
});

export default HomeScreen;