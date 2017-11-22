const initialData = {
    open:false,
    eventFn:null
};

export default function(state = initialData,{type,payload}){
    switch (type){
        case 'NAV_ASIDE_OPEN':{
            return {
                ...state,
                open:true
            };
        }
        case 'NAV_ASIDE_CLOSE':{
            return {
                ...state,
                eventFn:null,
                open:false
            };
        }
        case 'NAV_ASIDE_ADD_CLOSE_EVENT':{
            return {
                ...state,
                eventFn:payload.eventFn
            };
        }    
    }
    return state;
}