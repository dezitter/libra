import BaseModel from 'app/models/base';

const UserModel = BaseModel.extend({

});

UserModel.id = 'User';
UserModel.authenticate = function authenticate(login, password) {
    return new Promise(function(resolve, reject) {
        if (login === 'foo' &&  password === 'bar') {
            resolve({ login, password });
        }

        reject(new Error('Invalid login/password'));
    });
};

export default UserModel;

