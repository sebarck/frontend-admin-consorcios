import axios from 'axios';

export default axios.create({
    baseURL: 'https://backend-admin-consorcios.herokuapp.com/api-adminconsorcios/v1',
    headers: {
        "content-type": "application/json"
    }
});