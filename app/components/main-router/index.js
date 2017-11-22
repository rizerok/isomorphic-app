import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';

import HomeProvider from 'components/home/provider';
import AboutProvider from 'components/about/provider';
import ErrorPage from 'components/error/page';

import PageRouter from 'components/page/router';

class MainRouter extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <Switch>
                <Route exact path="/" component={HomeProvider} />
                <Route path="/about" component={AboutProvider} />
                <Route path="/page" component={PageRouter} />
                <Route component={ErrorPage} />
            </Switch>
        );
    }
}

export default MainRouter;