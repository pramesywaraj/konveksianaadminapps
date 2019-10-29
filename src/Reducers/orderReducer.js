import { FETCHED_ALL_ORDERS, ERROR } from '../Actions/actionTypes';

const initialState = {
    orders: [],
    isSucces: false,
    message: '',
    _id: '',
    categoryId: "",
    userId: "",
    materialId: "",
    photoUrl: "",
    createdAt: "",
    color: "",
};

export function order(state = initialState, action) {
    switch(action.type) {
        case FETCHED_ALL_ORDERS:
            return {
                ...state,
                orders: action.orders
            };
        case ERROR:
            return {
                ...state,
                isSuccess: false
            }
        default:
            return state;
    }
}