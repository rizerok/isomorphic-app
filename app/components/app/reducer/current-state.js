const initialData = {
    isFirstFetch:true,
    isFetching:false
};

export default function(state = initialData,action){
    switch(action.type){
        case 'CURRENT_STATE_REQUEST':{
            return {
                ...state,
                isFetching:true
            };
        }
        case 'CURRENT_STATE_ERROR':
        case 'CURRENT_STATE_SUCCESS':{
            return {
                ...state,
                isFirstFetch:false,
                isFetching:false
            };
        }    
    }
    return state;
}