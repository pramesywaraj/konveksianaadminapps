import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { order } from './orderReducer';
import { client } from './clientReducer';

const rootReducer = combineReducers({ 
    authentication,
    order,
    client
});

export default rootReducer;