import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from './reducers';
import App from './containers/App.js';
import { renderToString } from 'react-dom/server'
import qs from 'qs';
import { fetchCounter } from './api/counter'

const app = Express();
const port = 3000;

app.use('/static', Express.static('dist'));

app.use(handleRender);

function handleRender(req, res) {
    fetchCounter(apiResult => {
        const params = qs.parse(req.query);
        const counter = parseInt(params.counter, 10) || apiResult || 0;

        let preloadedState = { counter };

        const store = createStore(counterApp,preloadedState);

        const html = renderToString(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        const finalState = store.getState();

        res.send(renderFullPage(html,finalState));
    });

};

function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
        </script>
        <script src="/static/app.js"></script>
      </body>
    </html>
    `;
}

app.listen(port);