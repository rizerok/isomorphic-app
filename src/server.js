import { SERVER_PORT } from './config';
import ENV, { IS_DEV } from './utils/env';
//node
import path from 'path';
import fs from 'fs';
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
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes, matchRoutes } from 'react-router-config';
//src
import reducer from './reducers';
import routes from './routes';
import renderBaseTemplate from './templates/base';

const manifest = JSON.parse(fs.readFileSync(path.resolve('manifest.json'), 'utf8'));
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
    let preloadedState = { /*counter*/ };

    const store = createStore(reducer,preloadedState, applyMiddleware(thunk));

    const branch = matchRoutes(routes,ctx.url);
    const promises = branch.map(({route}) => {
        let fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
    });

    await Promise.all(promises);

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

    ctx.body = renderBaseTemplate(html,finalState,manifest);
}

app.listen(SERVER_PORT, err => {
    if(err){
        console.log(err);
    }

    console.log(`Server running on port ${SERVER_PORT}`);
});