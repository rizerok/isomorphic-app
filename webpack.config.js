const merge = require('webpack-merge');

const sameRule = function(a,b){
    if(String(a.test)!==String(b.test)){//check test
        return false;
    }

    let use1, use2;
    Array.isArray(a.use) ? use1 = a.use : use1 = [a.use];
    Array.isArray(b.use) ? use2 = b.use : use2 = [b.use];
    if(use1.length!==use2.length){//check loaders count
        return false;
    }

    for(let i = 0;i<use1.length;i++){//check by loaders
        if(use1[i].loader !== use2[i].loader){
            return false;
        }
    }

    return true;
};

const mergeConfig = {
    customizeArray(a, b, key) {
        if(key === 'module.rules'){
            let rules = b;
            a.forEach(elA=>{
                if(rules.every(r=>!sameRule(r,elA))){//uniq
                    rules.push(elA);
                }
            });
            return rules;
        }
        if(key === 'plugins'){
            if(
                a.find(elA=>elA.constructor.name==='ExtractTextPlugin') &&
                b.find(elB=>elB.constructor.name==='ExtractTextPlugin')
            ){
                let etp = a.find(elA=>elA.constructor.name==='ExtractTextPlugin');
                let idx = a.indexOf(etp);
                a.splice(idx,1);
            }
        }
        // Fall back to default merging
        return undefined;
    },
    customizeObject(a, b, key) {
        if (key === 'entry') {
            return b;
        }
        // Fall back to default merging
        return undefined;
    }
};

module.exports = function (env) {
    let clientConfig;
    let serverConfig = require('./webpack/webpack.server.js');

    switch(env) {
        case 'dev': {
            const base = require(`./webpack/webpack.client.js`);
            const dev = require(`./webpack/webpack.dev.js`);
            clientConfig = merge(mergeConfig)(base, dev);
            break;
        }
        case 'prod': {
            const base = require(`./webpack/webpack.client.js`);
            const prod = require(`./webpack/webpack.prod.js`);
            clientConfig = merge(mergeConfig)(base, prod);
            break;
        }
    }
    return [clientConfig,serverConfig];
};