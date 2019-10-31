import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { order } from './orderReducer';
import { client } from './clientReducer';
import { review } from './reviewReducer';
import { product } from './productReducer';


const rootReducer = combineReducers({ 
    authentication,
    order,
    client,
    review,
    product
});

export default rootReducer;