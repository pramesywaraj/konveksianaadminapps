import { combineReducers } from 'redux';
import { authentication } from './authReducer';
import { order } from './orderReducer';

const rootReducer = combineReducers({ 
    authentication,
    order
});

export default rootReducer;