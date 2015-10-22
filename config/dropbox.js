import config from './index';

export default {
    api_key   : config.get('DROPBOX_API_KEY'),
    api_secret: config.get('DROPBOX_API_SECRET'),
    token     : config.get('DROPBOX_TOKEN')
};
