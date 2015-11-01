import session from 'express-session';

/* FIXME use mongodb session store */
const sess = session({
    secret: 'foo',
    resave: false,
    saveUninitialized: false
});

export default function() {
    return sess;
}
