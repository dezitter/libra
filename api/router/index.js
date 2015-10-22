function router(app) {
    const fetcher = app.get('fetcher');
    const converter = app.get('converter');

    function parseMarkdown(file) {
        const content = converter.makeHtml(file.content);
        file.content = content;
        return file;
    }

    function respond(promise, req, res, next) {
        return promise
            .then(result => res.send(result))
            .catch(next);
    }

    app.get('/files', function(req, res, next) {
        const promise = fetcher.fetch();

        respond(promise, req, res, next);
    });

    app.get(/\/files(\/.+)/, function(req, res, next) {
        const filepath = req.params[0];
        const promise = fetcher.find(filepath)
                               .then(parseMarkdown);

        respond(promise, req, res, next);
    });

}

export default router;
