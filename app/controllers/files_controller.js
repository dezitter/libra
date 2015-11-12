import { isAuth } from 'app/controllers/decorators/is-auth';
import { requestToken } from 'app/controllers/decorators/request-token';

export default {

    @isAuth
    @requestToken
    index(params, cb) {
        const spec = { collection: { collection: 'Files' } };
        this.app.fetch(spec, cb);
    },

    @isAuth
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
