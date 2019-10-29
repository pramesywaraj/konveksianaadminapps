import { FETCHED_ALL_REVIEWS } from '../Actions/actionTypes';

const initialState = {
    reviews: [],
};

export function review(state = initialState, action) {
    switch(action.type) {
        case FETCHED_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.reviews
            };
        default:
            return state;
    }
}