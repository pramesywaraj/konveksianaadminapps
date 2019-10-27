import { 
    OPEN_MODAL, 
    CLOSE_MODAL, 
    HANDLE_ON_CHANGE, 
    FETCHED_ALL_CLIENTS, 
    POST_SUCCESS, 
    // POST_FAIL, 
    CLOSE_SNACKBAR,
    OPEN_SNACKBAR,
    ERROR,
    DELETE_SUCCESS
} from '../Actions/actionTypes';

const initialState = {
    clients: [],
    modal: false,
    snackbar: false,
    loading: true,
    isSuccess: false,
    message: null,
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
        case ERROR:
            return {
                ...state,
                isSuccess: false
            }
        case POST_SUCCESS:
            return {
                ...state,
                name: '',
                urlWeb: '',
                clientImage: '',
                isSuccess: true
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                clients: state.clients.filter(client => client._id !== action.clientId),
                isSuccess: true
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
        case HANDLE_ON_CHANGE:
            return {
                ...state,
                [action.props] : action.value
            }
        default: 
            return state;
    }
}
