export default {

    index: function(params, cb) {
        const spec = { collection: { collection: 'Files' } };
        this.app.fetch(spec, cb);
    },

    show: function(params, cb) {
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
