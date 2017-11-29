import 'isomorphic-fetch';
class Api{
    constructor(){

    }
    getUsers(){
        return fetch('//jsonplaceholder.typicode.com/users')
            .then(res => {
                return res.json();
            });
    }
}

const api = new Api;

export default api;