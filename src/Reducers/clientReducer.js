import { OPEN_MODAL, CLOSE_MODAL, HANDLE_ON_CHANGE, FETCHED_ALL_CLIENTS, POST_SUCCESS, POST_FAIL, CLOSE_SNACKBAR } from '../Actions/actionTypes';

const initialState = {
    clients: [],
    modal: false,
    loading: true,
    isSuccess: false,
    id: '',
    name: '',
    urlWeb: '',
    clientImage: '',
    status: true
};

export function client(state = initialState, action) {
    switch(action.type) {
        case FETCHED_ALL_CLIENTS:
            return {
                ...state,
                clients: action.clients,
                loading: false
            }
        case POST_SUCCESS:
            return {
                ...state,
                name: '',
                urlWeb: '',
                clientImage: '',
                isSuccess: true
            }
        case POST_FAIL:
            return {
                ...state,
                isSuccess: false
            }
        case OPEN_MODAL:
            return {
                ...state,
                modal: true
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modal: false
            }
        case CLOSE_SNACKBAR:
            return {
                ...state,
                isSuccess: false,
            }
        case HANDLE_ON_CHANGE:
            return {
                ...state,
                [action.props] : action.value
            }
        default: 
            return state;
    }
}
