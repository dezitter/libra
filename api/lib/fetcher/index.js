class Fetcher {

    constructor(options) {
        this.dropbox = options.dropbox;
    }

    fetch() {
        return this.dropbox.search('/', '.md');
    }

    find(path) {
        return this.dropbox.readFile(path);
    }
}

export default Fetcher;
