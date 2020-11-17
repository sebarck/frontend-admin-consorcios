import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Card, FAB, Title } from 'react-native-paper';
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
            <UltReclamosScreen userInfo={userInfo} cantVisible={3} navigation={navigation} />
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Listado reclamos')}>
                Ver todos
                </Button>
            <FAB
                style={style.fab}
                label="Crear nuevo reclamo"
                icon="pencil-plus-outline"
                onPress={() => navigation.navigate('Crear reclamo')}
            />
        </View>
    );
}

const style = StyleSheet.create({
    fab: {
        position: 'relative',
        margin: 20,
    }
});

export default HomeScreen;