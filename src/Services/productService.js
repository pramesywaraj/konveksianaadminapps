import axios from 'axios';
import config from './config';

export const productService = {
    getCategories,
    getCategoriesSteps,
    getProduct,
    getMaterial,
    postNewCategory,
    postNewProduct,
    postNewMaterial,
    postNewStep,
    deleteCategory,
    deleteProduct,
    deleteMaterial,
    deleteCategoryStep
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

function getCategoriesSteps(id) {
    return axios.get(`${config.baseUrl}step/categoryStep/${id}`, getOptions())
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

function postNewProduct(data) {
    return axios.post(config.baseUrl + 'product', data, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

function postNewMaterial(data) {
    return axios.post(config.baseUrl + 'material', data, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

function postNewStep(data) {
    return axios.post(config.baseUrl + 'step', data, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

function deleteCategory(id) {
    return axios.delete(config.baseUrl + 'category/' + id, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })
}

function deleteCategoryStep(id) {
    return axios.delete(config.baseUrl + 'step/' + id, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })
}

function deleteProduct(id) {
    return axios.delete(config.baseUrl + 'product/' + id, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })
}

function deleteMaterial(id) {
    return axios.delete(config.baseUrl + 'material/' + id, getOptions())
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })
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
