import { CLOSE_SNACKBAR, OPEN_SNACKBAR, CLOSE_MODAL, OPEN_MODAL } from './actionTypes';

export function changeSnackbarToClose() {
    return {
        type: CLOSE_SNACKBAR
    };
}

export function changeSnackbarToOpen(message) {
    return {
        type: OPEN_SNACKBAR,
        message: message
    };
}

export function changeModalToOpen() {
    return {
        type: OPEN_MODAL,
        modal: true,
    };
}

export function changeModalToClose() {
    return {
        type: CLOSE_MODAL,
        modal: false,
    };
}