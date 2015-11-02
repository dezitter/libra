import config from './index';

export default {
    protocol: config.get('SERVER_PROTOCOL'),
    hostname: config.get('SERVER_HOSTNAME'),
    port    : config.get('SERVER_PORT')
};
