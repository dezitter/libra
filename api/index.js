import connectMongo from 'connect-mongo';
import express from 'express';
import logger from 'morgan';
import router from 'api/router';
import session from 'express-session';
import { MongoClient } from 'mongodb';

import DropboxClient from 'api/lib/dropbox/client';
import Fetcher from 'api/lib/fetcher';
import config from '../config';
import dropboxCfg from '../config/dropbox';
import showdown from 'showdown';
import { checkTokenMiddleware } from './router/middlewares/check-token';

const app = express();
const mongo_db_uri = config.get('MONGO_DB_URI');

MongoClient.connect(mongo_db_uri)
    .then(function(db) {
        const SessionStore = connectMongo(session);
        const converter = new showdown.Converter();
        const dropbox = new DropboxClient(dropboxCfg);
        const fetcher = new Fetcher({ db, dropbox });

        // api configuration
        app.set('fetcher', fetcher);
        app.set('converter', converter);

        app.use(logger('dev'));
        app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: config.get('SESSION_SECRET'),
            store: new SessionStore({ url: mongo_db_uri })
        }));
        app.use(checkTokenMiddleware())
        router(app);

    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


export default app;
