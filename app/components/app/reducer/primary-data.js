import { combineReducers } from 'redux';

import company from './company';
import nav from './nav';
import state from './state';

export default combineReducers({
    company,
    nav,
    state
});