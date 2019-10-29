import { orderService } from '../Services/orderService';
// import { history } from '../Helpers';

import { 
    FETCHED_ALL_ORDERS, 
    ERROR 
} from './actionTypes';

import {
    changeSnackbarToOpen,
    changeSnackbarToClose
} from './generalActions';

export const orderAction = {
    getAllOrder
};

function getAllOrder() {
    return dispatch => {
        let apiEndpoint = 'order';
        orderService.getAllOrder(apiEndpoint)
            .then(res => {
                if(res.data.status === 200) {
                    dispatch(getOrderList(res.data.order));
                }
            })
            .catch((err) => {
                console.log('There is error on getAllOrder', err);
                dispatch(changeSnackbarToOpen('Terjadi kesalahan dalam mengambil data.'));
            })
    }
} 

// dispatch to order reducer function

function getOrderList(orders) {
    return {
        type: FETCHED_ALL_ORDERS,
        orders: orders
    }
}