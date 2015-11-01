import connectMongo from 'connect-mongo';
import express from 'express';
import router from 'api/router';
import session from 'express-session';

import DropboxClient from 'api/lib/dropbox/client';
import Fetcher from 'api/lib/fetcher';
import config from '../config';
import dropboxCfg from '../config/dropbox';
import showdown from 'showdown';

const MongoStore = connectMongo(session);
const app = express();
const converter = new showdown.Converter();
const dropbox = new DropboxClient(dropboxCfg);
const fetcher = new Fetcher({ dropbox });

// api configuration
app.set('fetcher', fetcher);
app.set('converter', converter);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.get('SESSION_SECRET'),
    store: new MongoStore({ url: config.get('MONGO_DB_URI') })
}));
router(app);

export default app;
