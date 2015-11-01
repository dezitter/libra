import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import debug from 'debug';
import express from 'express';
import logger from 'morgan';
import rendr from 'rendr';
import serverStatic from 'serve-static';
import session from 'express-session';

import ApiAdapter from 'app/server/adapter/api';
import api from 'api';
import config from './config';
import dropboxCfg from './config/dropbox';
import dataAdapterConfig from './config/dataAdapter';
import dropboxMiddleware from 'app/server/middlewares/dropbox';

const MongoStore = connectMongo(session);
const app = express();
const dbg = debug('libra');
const env = config.get('NODE_ENV');
const port = config.get('SERVER_PORT');
const api_port = config.get('API_PORT');
const dataAdapter = new ApiAdapter(dataAdapterConfig);
const server = rendr.createServer({ dataAdapter });

app.use(logger('dev'));
app.use(serverStatic(`${__dirname}/dist`));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.get('SESSION_SECRET'),
    store: new MongoStore({ url: config.get('MONGO_DB_URI') })
}));
app.use(bodyParser.json());

// app configuration
server.configure(function(expressApp) {
    expressApp.use(dropboxMiddleware(expressApp, {
        dropboxCfg,
        redirectPath: config.get('AUTH_REDIRECT_PATH'),
        serverCfg: {
            protocol: config.get('SERVER_PROTOCOL'),
            hostname: config.get('SERVER_HOSTNAME'),
            port: config.get('SERVER_PORT')
        }
    }));
});

app.use('/', server.expressApp);

api.listen(api_port, () => { dbg(`Api listening on port ${api_port} in ${env} mode`); });
app.listen(port,     () => { dbg(`Server listening on port ${port} in ${env} mode`); });
