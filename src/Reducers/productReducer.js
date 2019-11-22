import { 
    CLOSE_SNACKBAR,
    OPEN_SNACKBAR,
    FETCHED_ALL_CATEGORIES,
    ERROR
} from '../Actions/actionTypes';

const initialState = {
    categories: [],
    products: [],
    materials: [],
    loading: true,
    snackbar: false,
    isSuccess: false,
    message: null
};

export function product(state = initialState, action) {
    switch(action.type) {
        case FETCHED_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
                loading: false
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
