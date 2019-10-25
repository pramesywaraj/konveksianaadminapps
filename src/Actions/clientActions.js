import { history } from "../Helpers/history";
import {
    POST_SUCCESS,
    POST_FAIL,
    HANDLE_ON_CHANGE,
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
                    history.push("/clients");
                }
            }
        ).catch(
            (err) => {
                console.log("Error detected in createNewClient", err);
                dispatch(clientFailedCreated());
                dispatch(openSnackbar('Terjadi kesalahan.'));
            },
        );
    };
}

function deleteClient(id) {
    return dispatch => {
        clientService.deleteClient(endpoint, id).then(
            (res) => {
                if (res.status === 201) {

                }
            }
        )
        .catch((err) => {
            console.log(err);
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

function clientFailedCreated() {
    return {
        type: POST_FAIL,
    };
}

export function getClientList(clients) {
    return {
        type: FETCHED_ALL_CLIENTS,
        clients: clients,
    };
}
