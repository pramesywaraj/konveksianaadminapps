import { history } from '../Helpers/history';
import { OPEN_MODAL, CLOSE_MODAL } from './actionTypes';

export const clientActions = {
    openModal,
    closeModal
};

function openModal() {
    return dispatch => {
       dispatch(changeToOpen());
    };
}

function closeModal() {
    return dispatch => {
       dispatch(changeToClose());
    };
}

function changeToOpen() {
    return {
        type: OPEN_MODAL,
        modal: true
    }
}

function changeToClose() {
    return {
        type: CLOSE_MODAL,
        modal: false
    }
}
