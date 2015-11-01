import { buildRedirectURI, getAuthURL } from './utils';
import { getCallback } from './routes/get-callback';

export default function dropboxMiddleware(app, options) {
    const client_id = options.dropboxCfg.key;
    const redirect_uri = buildRedirectURI(options);

    app.get(options.redirectPath, getCallback(options));

    return function(req, res, next) {
        if (!req.session.token) {
            const authURL = getAuthURL({ client_id, redirect_uri });
            res.redirect(authURL);
        } else {
            next();
        }
    };
}
