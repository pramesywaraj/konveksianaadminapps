import { 
    OPEN_MODAL, 
    CLOSE_MODAL, 
    HANDLE_ON_CHANGE, 
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
        default: 
            return state;
    }
}
