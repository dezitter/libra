/* TODO fetch from dropbox */
const files = [
    { name: 'foo', content: 'Lorem ipsum' },
    { name: 'bar', content: 'Lorem ipsum' },
    { name: 'quz', content: 'Lorem ipsum' }
];

export default function(app) {

    app.get('/files', function(req, res) {
        res.send(files);
    });

    app.get('/files/:name', function(req, res) {
        const file = files.find(f => f.name === req.params.name);
        res.send(file);
    });

}
