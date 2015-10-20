import debug from 'debug';
import express from 'express';
import rendr from 'rendr';
import bodyParser from 'body-parser';
import serverStatic from 'serve-static';

import config from 'app/config';

const app = express();
const dbg = debug('libra');
const env = config.get('NODE_ENV');
const port = config.get('PORT');
const server = rendr.createServer();

server.configure(function(expressApp) {
    expressApp.use(serverStatic(`${__dirname}/public`));
    expressApp.use(bodyParser.json());
});

app.use('/', server.expressApp);

app.listen(port, () => {
    dbg(`Server listening on port ${port} in ${env} mode`);
});
