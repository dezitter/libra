import xss from 'xss';

function router(app) {
    const fetcher = app.get('fetcher');
    const converter = app.get('converter');

    function parseMarkdown(file) {
        const content = converter.makeHtml(file.content);
        file.content = content;
        return file;
    }

    function sanitize(file) {
        file.content = xss(file.content);
        return file;
    }

    function respond(promise, req, res, next) {
        return promise
        .then(result => res.send(result))
        .catch(next);
    }

    app.get('/files', function(req, res, next) {
        const filter = req.query.filter || '';
        const promise = fetcher.fetch({
            token: req.session.token,
            args: { root: '/', pattern: '.md' }
        })
        .then(files => files.map(sanitize))
        .then(files => {
            return files.filter(f => f.path.includes(filter));
        });

        respond(promise, req, res, next);
    });

    app.get(/\/files(\/.+)/, function(req, res, next) {
        const promise = fetcher.find({
            token: req.session.token,
            args: { filepath: req.params[0] }
        })
        .then(parseMarkdown)
        .then(sanitize);

        respond(promise, req, res, next);
    });
}

export default router;
