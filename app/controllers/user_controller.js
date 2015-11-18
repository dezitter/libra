import { isAuth } from 'app/controllers/decorators/is-auth';

export default {

    @isAuth
    login(params, cb) {
        cb();
    },

    @isAuth
    signup(params, cb) {
        cb();
    }
};
