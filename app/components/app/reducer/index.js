import { combineReducers } from 'redux';

import primaryData from './primary-data';
import pages from 'components/page/reducer/page';
import currentState from './current-state';
import asideMenu from 'components/nav/reducer/aside-menu';

export default combineReducers({
    primaryData,
    pages,
    currentState,
    asideMenu
});