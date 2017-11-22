import { getCompanyInfo } from './company-info';
import { getNav } from './nav';

import store from '../store';

export const getPrimaryData = () => dispatch =>{
    dispatch({
        type:'PRIMARY_DATA_REQUEST'
    });
    return Promise.all([
        dispatch(getCompanyInfo()),
        dispatch(getNav())
    ]).then(data=>{
        const {currentState} = store.getState();
        if(!(
            (currentState.isFirstFetch && currentState.isFetching)
            || (!currentState.isFirstFetch && !currentState.isFetching)
        )){
            dispatch({type:'CURRENT_STATE_ERROR'});
        }
        return dispatch({
            type:'PRIMARY_DATA_SUCCESS'
        });
    });
};