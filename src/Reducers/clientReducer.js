import { OPEN_MODAL, CLOSE_MODAL } from '../Actions/actionTypes';

const initialState = {
    modal: false
};

export function client(state = initialState, action) {
    switch(action.type) {
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
        default: 
            return state;
    }
}
