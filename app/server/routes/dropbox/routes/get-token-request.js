import { buildRedirectURI, getAuthURL } from '../utils';

export function getTokenRequestHandler(options) {
    const client_id = options.dropboxCfg.key;
    const redirect_uri = buildRedirectURI(options);

    return function sendTokenRequest(req, res, next) {
        if (!req.session.token) {
            const authURL = getAuthURL({ client_id, redirect_uri });
            res.redirect(authURL);
        } else {
            next();
        }
    };
}

