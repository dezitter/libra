import { isAuth } from 'app/controllers/decorators/is-auth';

export default {

    @isAuth
    index(params, cb) {
        cb();
    }
};
