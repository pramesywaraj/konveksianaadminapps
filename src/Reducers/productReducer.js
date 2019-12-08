import { 
    CLOSE_SNACKBAR,
    OPEN_SNACKBAR,
    FETCHED_ALL_CATEGORIES,
    ERROR
} from '../Actions/actionTypes';

const initialState = {
    categories: [],
    products: [],
    materials: [],
    loading: true,
    snackbar: false,
    isSuccess: false,
    message: null
};

export function product(state = initialState, action) {
    switch(action.type) {
        case FETCHED_ALL_CATEGORIES:
            let sortedCategory = action.categories;
            sortedCategory.sort((first, second) => {
                let firstOrder = first.name.toUpperCase();
                let secondOrder = second.name.toUpperCase();
                if(firstOrder < secondOrder) {
                    return -1;
                }

                if(firstOrder > secondOrder) {
                    return 1;
                }

                return 0;
            })

            return {
                ...state,
                categories: sortedCategory,
                loading: false
            }
        case ERROR:
            return {
                ...state,
                isSuccess: false
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
        default: 
            return state;
    }
}
