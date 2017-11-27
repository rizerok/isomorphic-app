import config from 'config';
import dotenv from 'dotenv';
import env from './utils/env';
import envs from './constants/envs';

dotenv.config();

if(!envs[env]){
    throw Error(`unknown env ${env}`);
}

const SERVER_PORT = process.env.server_port || config.get('server_port');

export {
    SERVER_PORT
};