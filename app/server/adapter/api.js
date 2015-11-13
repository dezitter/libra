import RestAdapter from 'rendr/server/data_adapter/rest_adapter';

class ApiAdapter extends RestAdapter {

    apiDefaults(api, req) {
        api = super.apiDefaults(api, req);

        api.ca = this.options.ca;
        api.headers['Cookie'] = req.headers.cookie;

        return api;
    }

}

export default ApiAdapter;
