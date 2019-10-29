import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { order } from './orderReducer';
import { client } from './clientReducer';
import { review } from './reviewReducer';


const rootReducer = combineReducers({ 
    authentication,
    order,
    client,
    review
});

export default rootReducer;