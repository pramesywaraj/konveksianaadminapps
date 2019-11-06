import { productService } from '../Services/productService';

import { 
    FETCHED_ALL_CATEGORIES, 
    ERROR 
} from './actionTypes';

import {
    changeSnackbarToOpen,
    changeSnackbarToClose
} from './generalActions';

export const productActions = {
    getAllCategories
};

function getAllCategories() {
    return dispatch => {
        let apiEndpoint = 'category/step';
        productService.getCategories(apiEndpoint)
            .then(res => {
                if(res.data.status === 200) {
                    dispatch(getCategoriesList(res.data.category));
                }
            })
            .catch((err) => {
                console.log('There is error on getAllCategories', err);
                dispatch(errorGet());
                dispatch(changeSnackbarToOpen('Terjadi kesalahan dalam mengambil data.'));
            })
    }
} 

// dispatch to order reducer function

function getCategoriesList(categories) {
    return {
        type: FETCHED_ALL_CATEGORIES,
        categories: categories
    }
}

function errorGet() {
    return {
        type: ERROR
    }
}