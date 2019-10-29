import { FETCHED_ALL_REVIEWS, ERROR, OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../Actions/actionTypes';

const initialState = {
    reviews: [],
    isSuccess: false,
    snackbar: false,
    message: null
};

export function review(state = initialState, action) {
    switch(action.type) {
        case FETCHED_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.reviews
            }
        case ERROR:
            return {
                ...state,
                isSuccess: false
            }
        case OPEN_SNACKBAR:
                return {
                    ...state,
                    snackbar: true,
                    message: action.message
                }
        case CLOSE_SNACKBAR:
            return {
                ...state,
                snackbar: false
            }
        default:
            return state;
    }
}