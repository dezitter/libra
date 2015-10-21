export default {

    index: function(params, cb) {
        const spec = { collection: { collection: 'Files' } };
        this.app.fetch(spec, cb);
    },

    show: function(params, cb) {
        const spec = { model: { params, model: 'File' } };
        this.app.fetch(spec, cb);
    }
};
