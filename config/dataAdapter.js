import config from './index';
import secureCfg from './secure';

export default {
    'default': {
        protocol: config.get('API_PROTOCOL'),
        hostname: config.get('API_HOSTNAME'),
        port: config.get('API_PORT')
    },
    ca: secureCfg.ca
};
