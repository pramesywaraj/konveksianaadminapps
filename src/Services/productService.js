import axios from 'axios';
import config from './config';

export const productService = {
    getCategories
}

function getCategories(endpoint) {
    return axios.get(config.baseUrl + endpoint, getOptions())
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
