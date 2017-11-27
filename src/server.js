import { SERVER_PORT } from './config';
import ENV, { IS_DEV } from './utils/env';

import path from 'path';
//Koa
import Koa from 'koa';
import serve from 'koa-static';
import Router from 'koa-router';
import logger from 'koa-logger';
//React
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes, matchRoutes } from 'react-router-config';

import qs from 'qs';

import routes from './routes';


const app = new Koa();
const router = new Router();

//priority app.use is important
if(IS_DEV){
    app.use(logger());
}

app.use(serve(path.resolve('public')));

router.get('*',handleRender);
app
    .use(router.routes())
    .use(router.allowedMethods());


async function handleRender(ctx, next) {
    const params = qs.parse(ctx.query);
    const counter = parseInt(params.counter, 10) || 0;

    let preloadedState = { counter };

    const store = createStore(reducer,preloadedState, applyMiddleware(thunk));

    const branch = matchRoutes(routes,ctx.url);

    const promises = branch.map(({route}) => {
        let fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
    });

    await Promise.all(promises);
    //console.log('store',store.getState());
    let context = {};

    let html = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.url} context={context}>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    );
    
    const finalState = store.getState();

    if(context.status === 404){
        ctx.status = 404;
    }

    if (context.status === 301) {
        ctx.status = 301;
        ctx.redirect(context.url);
    }
    ctx.body = renderFullPage(html,finalState);
}

function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <link rel="stylesheet" href="/app.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
        </script>
        <script src="/app.js"></script>
      </body>
    </html>
    `;
}

app.listen(SERVER_PORT, err => {
    if(err){
        console.log(err);
    }

    console.log(`Server running on port ${SERVER_PORT}`);
});

