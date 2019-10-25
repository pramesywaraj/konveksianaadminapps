import axios from 'axios';
import config from './config';

export const clientService = {
    getAllClients,
    addNewClient,
    deleteClient
}

function getAllClients(endpoint) {
    return axios.get(config.baseUrl+endpoint, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

function addNewClient(endpoint, data) {
    return axios.post(config.baseUrl + endpoint, getOptions('FORM'))
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

function deleteClient(endpoint, id) {
    return axios.delete(config.baseUrl + endpoint + '/' + id, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
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
