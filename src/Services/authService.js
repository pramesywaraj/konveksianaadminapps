import axios from 'axios';
import config from './config';

export const authService = {
    post
}

function post(apiEndpoint, payload) {
    return axios.post(config.baseUrl + apiEndpoint, payload)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

