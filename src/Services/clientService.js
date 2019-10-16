import axios from 'axios';
import config from './config';

export const clientService = {
    getAllClients,
    addNewClient
}

function getAllClients(endpoint) {
    return axios.get(config.baseUrl+endpoint, getOptions())
        .then((res) => {
            console.log('On clientService getAllClients function success', res);
            return res;
        },  err => {
            console.log('On clientService getAllClients function fail', err);
            return err;
        });
}

function addNewClient(endpoint, data) {
    return axios.post(config.baseUrl + endpoint, data, getOptions('FORM'))
        .then(res => {
            console.log('On clientService addNewClient function success', res);
            return res;
        }, err => {
            console.log('On clientService addNewClient function fail', err);
            return err;
        });
}

function getOptions(type) {
    let options = {};

    if(localStorage.getItem('token')){
        options.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };

        switch(type) {
            case 'FORM': {
                options.headers['Content-Type'] = 'multipart/form-data';
                break;
            }  
            default:
                break;
        }

    }
    
    return options;
}
