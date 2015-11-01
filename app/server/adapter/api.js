import RestAdapter from 'rendr/server/data_adapter/rest_adapter';

class ApiAdapter extends RestAdapter {

    // pass request cookies down to api
    apiDefaults(api, req) {
        api = super.apiDefaults(api, req);
        Object.assign(api.headers, {
            'Cookie': req.headers.cookie
        });
        return api;
    }

}

export default ApiAdapter;
