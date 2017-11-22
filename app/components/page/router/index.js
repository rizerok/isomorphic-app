import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

import PageProvider from '../provider';

class PageRouter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Route path="/page/:slug" component={PageProvider} />
        );
    }
}

export default PageRouter;