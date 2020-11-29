import backendAdminConsorcios from '../../../apis/backendAdminConsorcios';

const ObtenerReclamosViviente = async ({userInfo}) =>
    await backendAdminConsorcios.get('/reclamos/viviente/' + userInfo.idViviente, {
        "headers": {
            "content-type": "application/json"
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error.response.data.error)
    });
export default ObtenerReclamosViviente;