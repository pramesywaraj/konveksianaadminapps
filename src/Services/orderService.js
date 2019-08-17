import axios from 'axios';
import config from './config';

export const orderService = {
    getAllOrder
}

function getAllOrder(apiEndpoint) {
    return axios.get(config.baseUrl+apiEndpoint, getOptions())
        .then((res) => {
            return res;
        },  err => {
            console.log(err);
            return err.response;
        });
}

function getOptions(){
    let options = {};
    if(localStorage.getItem('token')){
        options.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    }
    return options;
}
