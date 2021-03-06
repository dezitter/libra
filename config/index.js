import nconf from 'nconf';

nconf
    .argv()
    .env()
    .file({ file: 'config/secret.json' })
    .defaults({
        SERVER_PORT: 3000,
        SERVER_HOSTNAME: 'localhost',
        SERVER_PROTOCOL: 'https',

        AUTH_REDIRECT_PATH: '/callback',

        API_PORT: 3001,
        API_HOSTNAME: 'localhost',
        API_PROTOCOL: 'https',

        MONGO_DB_URI: 'mongodb://localhost/libra'
    });

export default nconf;
