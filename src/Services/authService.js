import axios from 'axios';
import config from './config';

export const authService = {
    post
}

function post(apiEndpoint, payload) {
    return axios.post(config.baseUrl + apiEndpoint, payload)
        .then(res => {
            return res;
        }, err => {
            return err.response;
        })
}

