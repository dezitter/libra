const specs = {

    search: {
        method: 'search',
        responseParams: ['stats']
    },

    readFile: {
        method: 'readFile',
        responseParams: ['content', 'stat', 'info']
    }

};

export function getSpecs(method) {
    if (!specs[method]) {
        throw new Error(`Unknown method "${method}"`);
    }

    return Object.assign({}, specs[method]);
}
