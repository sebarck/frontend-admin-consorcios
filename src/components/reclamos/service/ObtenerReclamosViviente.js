import React from 'react';
import backendAdminConsorcios from '../../../apis/backendAdminConsorcios';

export async function ObtenerReclamosViviente(props) {
    return backendAdminConsorcios.get('/reclamos/viviente/' + props.userInfo.idViviente, {
        "headers": {
            "content-type": "application/json"
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error.response.data.error)
    });

};