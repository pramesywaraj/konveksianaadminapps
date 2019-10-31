import { 
    OPEN_MODAL, 
    CLOSE_MODAL, 
    HANDLE_ON_CHANGE, 
    FETCHED_ALL_CLIENTS
} from '../Actions/actionTypes';

const initialState = {
    categories: [],
    products: [],
    materials: [],
    snackbar: false,
    isSuccess: false,
    message: null
};

export function product(state = initialState, action) {
    switch(action.type) {
        case FETCHED_ALL_CLIENTS:
            return {
                ...state,
                clients: action.clients
            }
        default: 
            return state;
    }
}
