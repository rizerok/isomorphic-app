export const getNav = () => dispatch =>{
    dispatch({
        type:'NAV_REQUEST'
    });
    return fetch('/api/navigation.json')
        .then(resp=>resp.json())
        .then(data=>{
            return dispatch({
                type:'NAV_SUCCESS',
                payload:data
            });
        });
};