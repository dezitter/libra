import config from './index';

export default {
    key   : config.get('DROPBOX_KEY'),
    secret: config.get('DROPBOX_SECRET')
};
