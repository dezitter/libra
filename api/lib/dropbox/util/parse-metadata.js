export function parseMetadata(metadata) {
    const _metadata = Object.assign({}, metadata);

    ['modified', 'client_mtime'].forEach(prop => {
        _metadata[prop] = new Date( metadata[prop] ).getTime();
    });

    return _metadata;
}
