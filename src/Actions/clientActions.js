import { history } from "../Helpers/history";
import {
    OPEN_MODAL,
    CLOSE_MODAL,
    POST_SUCCESS,
    POST_FAIL,
    HANDLE_ON_CHANGE,
    FETCHED_ALL_CLIENTS,
    CLOSE_SNACKBAR
} from "./actionTypes";
import { clientService } from "../Services/clientService";

export const clientActions = {
    openModal,
    closeModal,
    onChangeProps,
    getAllClients,
    createNewClient,
};

function getAllClients() {
    return dispatch => {
        let apiEndpoint = "client";
        clientService.getAllClients(apiEndpoint).then(
            res => {
                if (res.data.status === 200) {
                    dispatch(getClientList(res.data.client));
                }
            },
            err => {
                console.log(err);
            },
        );
    };
}

function createNewClient(data) {
    return dispatch => {
        let endpoint = "client";
        let payload = new FormData();

        payload.append("name", data.name);
        payload.append("urlWeb", data.urlWeb);
        payload.append("clientImage", data.clientImage);
        payload.append("status", true);

        clientService.addNewClient(endpoint, payload).then(
            res => {
                if (res.status === 201) {
                    alert('Client berhasil dibuat.');
                    history.push("/clients");
                    dispatch(clientCreated());
                }

                dispatch(closeSnackbar());
            },
            err => {
                console.log("Error detected in createNewClient", err);
                dispatch(closeSnackbar());
            },
        );
    };
}

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

function closeSnackbar() {
    return dispatch => {
        dispatch(snackbarClosed());
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

function snackbarClosed() {
    return {
        type: CLOSE_SNACKBAR
    };
}

function changeToOpen() {
    return {
        type: OPEN_MODAL,
        modal: true,
    };
}

function changeToClose() {
    return {
        type: CLOSE_MODAL,
        modal: false,
    };
}

export function getClientList(clients) {
    return {
        type: FETCHED_ALL_CLIENTS,
        clients: clients,
    };
}
