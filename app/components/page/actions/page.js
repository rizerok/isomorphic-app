import {
    currentStateRequest,
    currentStateReceive,
    currentStateStartChange
} from 'components/app/actions/current-state';

export const getPage = (slug) => (dispatch,getState) => {//actions creator
    //always
    dispatch(currentStateStartChange());

    //find in cache
    const store = getState();
    let page = store.pages.list && store.pages.list.find(p=>p.slug===slug);
    if(page){
        return page;
    }
    //if no find - fetch
    dispatch(currentStateRequest());
    dispatch({//action
        type:'PAGE_REQUEST',
        payload:{
            page
        }
    });
    return fetch(`/api/${slug}.json`,{
        method:'GET'
    })
        .then(resp=>resp.json())
        .then(page=>{
            //https://github.com/acdlite/flux-standard-action
            dispatch({//action
                type:'PAGE_SUCCESS',
                payload:{
                    page
                }
            });
            dispatch(currentStateReceive());
        });


};
