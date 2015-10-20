import nconf from 'nconf';

nconf
    .argv()
    .env()
    .defaults({
        PORT: 3000
    });

export default nconf;
