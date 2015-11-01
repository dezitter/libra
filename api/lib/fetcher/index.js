class Fetcher {

    constructor(options) {
        this.dropbox = options.dropbox;
    }

    fetch(options) {
        return this.dropbox.search(options);
    }

    find(path) {
        return this.dropbox.readFile(path);
    }
}

export default Fetcher;
