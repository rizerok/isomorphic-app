const initialState = {
    list:[
        
    ]
};

export default function playlist(state = initialState,action){
    switch(action.type){
        case 'PAGE_REQUEST':{
            break;
        }
        case 'PAGE_SUCCESS':{
            let list = [...state.list];
            list.push(action.payload.page);
            return {
                ...state,
                list
            };
        }
    }
    return state;
}