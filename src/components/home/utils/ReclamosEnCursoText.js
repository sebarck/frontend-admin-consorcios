import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';

const ReclamosEnCursoText = (props) => {
    if (props.reclamosEnCurso > 0) {
        return (
            <View>
                <Paragraph>
                    Tenés {props.reclamosEnCurso} reclamo/s pendientes
                </Paragraph>
            </View>
        );
    } else {
        return (
            <View>
                <Paragraph>
                    No tenés reclamos pendientes!
                </Paragraph>
            </View>
        );
    }
}

export default ReclamosEnCursoText;