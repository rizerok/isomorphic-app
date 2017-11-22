import store from 'components/app/store';

export const switchAside = (openState) => dispatch => {
    if(openState){
        dispatch({type:'NAV_ASIDE_OPEN'});
    }else{
        const state = store.getState();
        document.removeEventListener('click',state.asideMenu.eventFn);
        dispatch({type:'NAV_ASIDE_CLOSE'});
    }
};

export const addCloseEventFn = (eventFn) => dispatch => {
    document.addEventListener('click',eventFn);
    dispatch({type:'NAV_ASIDE_ADD_CLOSE_EVENT',payload:{eventFn}});
};

