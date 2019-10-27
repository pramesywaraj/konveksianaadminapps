import { history } from "../Helpers/history";
import {
    POST_SUCCESS,
    ERROR,
    HANDLE_ON_CHANGE,
    DELETE_SUCCESS,
    FETCHED_ALL_CLIENTS
} from "./actionTypes";
import { 
    changeSnackbarToClose,
    changeSnackbarToOpen,
    changeModalToClose,
    changeModalToOpen 
} from './generalActions';

import { clientService } from "../Services/clientService";

export const clientActions = {
    openModal,
    closeModal,
    openSnackbar,
    closeSnackbar,
    onChangeProps,
    getAllClients,
    createNewClient,
    deleteClient
};

const endpoint = 'client';

function getAllClients() {
    return dispatch => {
        clientService.getAllClients(endpoint).then(
            (res) => {
                console.log(res);
                if (res.data.status === 200) {
                    dispatch(getClientList(res.data.client));
                }
            }
        ).catch(
            err => {
                console.log(err);
                dispatch(errorFunction());
                dispatch(openSnackbar('Terjadi kesalahan. Gagal mendapatkan Client.'))
            }
        );
    };
}

function createNewClient(data) {
    return dispatch => {
        let payload = new FormData();

        payload.append("name", data.name);
        payload.append("urlWeb", data.urlWeb);
        payload.append("clientImage", data.clientImage);
        payload.append("status", true);

        clientService.addNewClient(endpoint, payload).then(
            (res) => {
                if (res.status === 201) {
                    dispatch(clientCreated());
                    dispatch(openSnackbar('Client berhasil ditambahkan.'));
                    dispatch(closeModal());
                    history.push('/clients');
                }
            }
        ).catch(
            (err) => {
                console.log("Error detected in createNewClient", err);
                dispatch(errorFunction());
                dispatch(openSnackbar('Terjadi kesalahan. Gagal membuat Client.'));
            },
        );
    };
}

function deleteClient(id) {
    return dispatch => {
        clientService.deleteClient(endpoint, id).then(
            (res) => {
                if (res.status === 201) {
                    dispatch(clientDeleted(id));
                    dispatch(openSnackbar('Client berhasil dihapus.'));
                    history.push('/clients');
                }
            }
        )
        .catch((err) => {
            console.log("Error detected in deleteClient", err);
            dispatch(errorFunction());
            dispatch(openSnackbar('Terjadi kesalahan. Gagal menghapus Client'));
        })
    }
}

function openModal() {
    return dispatch => {
        dispatch(changeModalToOpen());
    };
}

function closeModal() {
    return dispatch => {
        dispatch(changeModalToClose());
    };
}

function closeSnackbar() {
    return dispatch => {
        dispatch(changeSnackbarToClose());
    };
}

function openSnackbar(message) {
    return dispatch => {
        dispatch(changeSnackbarToOpen(message));
    };
}

function onChangeProps(props, event) {
    return dispatch => {
        if (event.target.files === null) {
            dispatch(handleOnChangeProps(props, event.target.value));
        } else {
            dispatch(handleOnChangeProps(props, event.target.files[0]));
        }
    };
}

function handleOnChangeProps(props, value) {
    return {
        type: HANDLE_ON_CHANGE,
        props: props,
        value: value,
    };
}

function clientCreated() {
    return {
        type: POST_SUCCESS,
    };
}

function clientDeleted(id) {
    return {
        type: DELETE_SUCCESS,
        clientId: id
    };
}

function errorFunction() {
    return {
        type: ERROR,
    };
}

export function getClientList(clients) {
    return {
        type: FETCHED_ALL_CLIENTS,
        clients: clients,
    };
}
