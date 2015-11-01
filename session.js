import config from './config';
import session from 'express-session';

/* FIXME use mongodb session store */
const sess = session({
    secret: config.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false
});

export default function() {
    return sess;
}
