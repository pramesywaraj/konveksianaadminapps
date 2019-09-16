import { orderService } from '../Services/orderService';
import { history } from '../Helpers';

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
            }, err => {
                console.log(err);
            })
    }
} 

export function getOrderList(orders) {
    return {
        type: 'FETCHED_ALL_ORDERS',
        orders: orders
    }
}