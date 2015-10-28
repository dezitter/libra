import debug from 'debug';
import express from 'express';
import rendr from 'rendr';
import bodyParser from 'body-parser';
import serverStatic from 'serve-static';

import api from 'api';
import config from './config';
import dataAdapterConfig from './config/dataAdapter';

const app = express();
const dbg = debug('libra');
const env = config.get('NODE_ENV');
const port = config.get('PORT');
const api_port = config.get('API_PORT');
const server = rendr.createServer({ dataAdapterConfig });

// app configuration
server.configure(function(expressApp) {
    expressApp.use(serverStatic(`${__dirname}/dist`));
    expressApp.use(bodyParser.json());
});

app.use('/', server.expressApp);

api.listen(api_port, () => { dbg(`Api listening on port ${api_port} in ${env} mode`); });
app.listen(port,     () => { dbg(`Server listening on port ${port} in ${env} mode`); });
