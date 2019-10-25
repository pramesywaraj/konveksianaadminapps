import axios from 'axios';
import config from './config';

export const orderService = {
    getAllOrder
}

function getAllOrder(apiEndpoint) {
    return axios.get(config.baseUrl + apiEndpoint, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

function getOptions() {
    let options = {};
    if(localStorage.getItem('token')){
        options.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    }
    return options;
}
