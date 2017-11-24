import 'styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import thunk from 'redux-thunk';
import routes from './routes';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, preloadedState,composeEnhancers(
    applyMiddleware(thunk)
));

//const store = createStore(counterApp,preloadedState,applyMiddleware(thunk));

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);