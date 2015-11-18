import { needAuth } from 'app/controllers/decorators/need-auth';

export default {

    @needAuth
    index(params, cb) {
        cb();
    }
};
