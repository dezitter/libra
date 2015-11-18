import { needAuth } from 'app/controllers/decorators/need-auth';
import { requestToken } from 'app/controllers/decorators/request-token';

export default {

    @needAuth
    @requestToken
    index(params, cb) {
        const spec = { collection: { collection: 'Files' } };
        this.app.fetch(spec, cb);
    },

    @needAuth
    @requestToken
    show(params, cb) {
        const path = params[0];

        const spec = {
            model: {
                model: 'File',
                needsFetch: true,
                params: { path }
            }
        };
        this.app.fetch(spec, cb);
    }
};
