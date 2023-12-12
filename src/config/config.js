import { devConfig } from './dev.config.js';
import { prodConfig } from './prod.config.js';

const env = process.env.NODE_ENV || 'development';

let envConfig = {};

switch(env) {
    case 'dev':
    case 'development':
        envConfig = devConfig
        break;
    case 'prod':
    case 'production':
        envConfig = prodConfig
        break;
    default:
        envConfig = devConfig
}

export default envConfig;