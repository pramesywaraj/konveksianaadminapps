import axios from 'axios';
import config from './config';

export const productService = {
    getCategories,
    getProduct,
    getMaterial,
    postNewCategory
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

function getProduct(categoryId) {
    return axios.get(config.baseUrl + 'product/category/' + categoryId, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

function getMaterial(productId) {
    return axios.get(config.baseUrl + 'material/product/' + productId, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

function postNewCategory(data) {
    return axios.post(config.baseUrl + 'category', data, getOptions())
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
    }

    switch(type) {
        case 'FORM': {
            options.headers['Content-Type'] = 'multipart/form-data';
            break;
        }  
        case 'JSON': {
            options.headers['Content-Type'] = 'application/json';
            break;
        }  
        default:
            break;
    }

    return options;
}
