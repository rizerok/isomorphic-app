import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';

class MainRouter extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <Switch>
                <Route exact path="/" render={()=>(
                    <h1>For example</h1>
                )} />
                <Route exact path="/2" render={()=>(
                    <h1>For example 2</h1>
                )} />
            </Switch>
        );
    }
}

export default MainRouter;