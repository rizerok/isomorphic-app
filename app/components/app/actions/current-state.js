import { switchAside } from 'components/nav/actions/aside';

export const currentStateStartChange = () => dispatch =>{
    dispatch(switchAside(false));
    dispatch({type:'CURRENT_STATE_START_CHANGE'});
};
export const currentStateRequest = () => dispatch =>{
    dispatch({type:'CURRENT_STATE_REQUEST'});
};
export const currentStateReceive = () => dispatch =>{
    switchAside(false);
    dispatch({type:'CURRENT_STATE_SUCCESS'});
};