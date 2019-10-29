import { history } from "../Helpers/history";
import {
    ERROR,
    FETCHED_ALL_REVIEWS,
} from "./actionTypes";
import { 
    changeSnackbarToClose,
    changeSnackbarToOpen
} from './generalActions';

import { reviewService } from "../Services/reviewService";

export const reviewActions = {
    getReviewAction,
    changeSnackbarToClose
}

function getReviewAction() {
    return dispatch => {
        let endpoint = 'review';
        reviewService.getReviews(endpoint)
            .then((res) => {
                console.log(res);
                if(res.status === 200) {
                    dispatch(dispatchGetReview(res.data));
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(dispatchError());
                dispatch(changeSnackbarToOpen('Terjadi Kesalahan. Coba refresh halaman ini.'))
            })
    }
}

// dispatch to reducer function

function dispatchGetReview(data) {
    return {
        type: FETCHED_ALL_REVIEWS,
        reviews: data
    }
}

function dispatchError() {
    return {
        type: ERROR
    }
}

