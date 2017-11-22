const initialState = {
    isFetching:true
};

export default function(state = initialState,action){
    switch(action.type){
        case 'PRIMARY_DATA_REQUEST':{
            return {
                ...state,
                isFetching:true
            };
        }
        case 'PRIMARY_DATA_SUCCESS':{
            return {
                ...state,
                isFetching:false
            };
        }
    }
    return state;
}