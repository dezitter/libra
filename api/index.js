import express from 'express';
import router from 'api/router';
import session from '../session';

import DropboxClient from 'api/lib/dropbox/client';
import Fetcher from 'api/lib/fetcher';
import dropboxCfg from '../config/dropbox';
import showdown from 'showdown';

const app = express();
const converter = new showdown.Converter();
const dropbox = new DropboxClient(dropboxCfg);
const fetcher = new Fetcher({ dropbox });

// api configuration
app.set('fetcher', fetcher);
app.set('converter', converter);

app.use(session());
router(app);

export default app;
