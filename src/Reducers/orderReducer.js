import { FETCHED_ALL_ORDERS } from '../Actions/actionTypes';

const initialState = {
    orders: [],
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
        default:
            return state;
    }
}