import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import debug from 'debug';
import express from 'express';
import https from 'https';
import logger from 'morgan';
import rendr from 'rendr';
import serverStatic from 'serve-static';
import session from 'express-session';

import config from './config';
import dataAdapterConfig from './config/dataAdapter';
import dropboxCfg from './config/dropbox';
import secureCfg from './config/secure';
import serverCfg from './config/server';

import ApiAdapter from 'app/server/adapter/api';
import api from 'api';

import initSession from 'app/server/middlewares/init-session';
import { authenticate, signup } from 'app/server/routes/user';
import { getCallbackHandler } from 'app/server/routes/dropbox/routes/get-callback';
import { getTokenRequestHandler } from 'app/server/routes/dropbox/routes/get-token-request';

const MongoStore = connectMongo(session);
const app = express();
const dbg = debug('libra');
const env = config.get('NODE_ENV');
const port = config.get('SERVER_PORT');
const api_port = config.get('API_PORT');
const dataAdapter = new ApiAdapter(dataAdapterConfig);
const server = rendr.createServer({ dataAdapter });

const dbxRedirectPath = config.get('AUTH_REDIRECT_PATH');
const dbxRedirectHandler = getCallbackHandler({
    dropboxCfg,
    serverCfg,
    redirectPath: dbxRedirectPath
});
const dbxTokenRequestHandler = getTokenRequestHandler({
    dropboxCfg,
    serverCfg,
    redirectPath: dbxRedirectPath
});

// setup app middlewares
app.use(logger('dev'));
app.use(serverStatic(`${__dirname}/dist`));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.get('SESSION_SECRET'),
    store: new MongoStore({ url: config.get('MONGO_DB_URI') })
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure rendr app
server.configure(function(expressApp) {
    expressApp.use(initSession());
});

// setup app routes
app.post('/login', authenticate);
app.post('/signup', signup);
app.get('/request-token', dbxTokenRequestHandler);
app.get(dbxRedirectPath, dbxRedirectHandler);

app.use('/', server.expressApp);

// boot servers
const httpsOptions = Object.assign({}, secureCfg);

https.createServer(httpsOptions, api)
     .listen(api_port, () => { dbg(`Api listening on port ${api_port} in ${env} mode`); });

https.createServer(httpsOptions, app)
     .listen(port, () => { dbg(`Server listening on port ${port} in ${env} mode`); });
