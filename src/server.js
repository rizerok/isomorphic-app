import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import Router from 'koa-router';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';

import { renderToString } from 'react-dom/server';

import qs from 'qs';
import { fetchCounter } from './api/counter';

import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes, matchRoutes } from 'react-router-config';

import routes from './routes';

const app = new Koa();
const port = 3000;
const router = new Router();

app.use(serve(path.resolve()));

//app.use(handleRender);

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

    await Promise.all(promises).then(data=>console.log(data));
    //console.log('store',store.getState());
    let context = {};

    let html = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.url} context={context}>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    );

    //console.log(2);
    const finalState = store.getState();

    if(context.status === 404){
        ctx.status = 404;
    }
    if (context.status === 301) {
        ctx.status = 301;
        ctx.redirect(context.url);
    }
    ctx.body = renderFullPage(html,finalState);

    // await fetchCounter(apiResult => {
    //     const params = qs.parse(ctx.req.query);
    //     const counter = parseInt(params.counter, 10) || apiResult || 0;
    //
    //     let preloadedState = { counter };
    //
    //     const store = createStore(counterApp,preloadedState);
    //
    //     let context = {};
    //     const html = renderToString(
    //         <Provider store={store}>
    //             <StaticRouter location={ctx.url} context={context}>
    //                 {renderRoutes(routes)}
    //             </StaticRouter>
    //         </Provider>
    //     );
    //
    //     const finalState = store.getState();
    //
    //     ctx.body = renderFullPage(html,finalState);
    //     //console.log(1);
    // });
    //console.log(2);
}

function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <link rel="stylesheet" href="/public/app.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
        </script>
        <script src="/public/app.js"></script>
      </body>
    </html>
    `;
}

app.listen(port);