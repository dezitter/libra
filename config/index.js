import nconf from 'nconf';

nconf
    .argv()
    .env()
    .file({ file: 'config/dropbox.json' })
    .defaults({
        PORT: 3000,
        API_PORT: 3001,
        API_HOSTNAME: 'localhost',
        API_PROTOCOL: 'http'
    });

export default nconf;
