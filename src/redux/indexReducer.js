import { combineReducers } from 'redux';
import cart from './cartReducer';
import user from './userReducer';

export default combineReducers({user, cart})