import request from 'superagent';
import { buildRedirectURI, getTokenURL, getTokenPayload } from '../utils';

export function getCallbackHandler(options) {
    const { key, secret } = options.dropboxCfg;
    const redirect_uri = buildRedirectURI(options);

    return function dropboxCallbackHandler(req, res, next) {
        if (req.query.error) return next(req.query.error);

        const tokenURL = getTokenURL();
        const payload = getTokenPayload({
            redirect_uri,
            code: req.query.code
        });

        request.post(tokenURL)
               .type('form')
               .send(payload)
               .auth(key, secret)
               .end((error, response) => {
                   if (error) return next(error);

                   const data = JSON.parse(response.text);
                   req.session.token = data.access_token;
                   res.redirect('/');
               });
    };
}
