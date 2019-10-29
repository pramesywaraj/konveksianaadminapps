import { history } from "../Helpers/history";
import {
    POST_SUCCESS,
    ERROR,
    FETCHED_ALL_REVIEWS,
} from "./actionTypes";
import { 
    changeSnackbarToClose,
    changeSnackbarToOpen
} from './generalActions';

import { reviewService } from "../Services/reviewService";

export const reviewActions = {
    getReviewAction
}

function getReviewAction() {
    return dispatch => {
        let endpoint = 'review';
        reviewService.getReviews(endpoint)
            .then((res) => {
                if(res.data.status === 200) {
                    dispatch(dispatchGetReview(res.data));
                }
            })
            .catch((err) => {
                console.log(err);
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

