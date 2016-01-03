# Libra

A markdown file viewer.

## Install

1. Clone this repository.
2. Install [MongoDB](https://www.mongodb.org/downloads) and [Node.js](https://nodejs.org/).
3. Create an app at [dropbox.com/developers/apps](https://www.dropbox.com/developers/apps)
 1. Set `https://localhost:3000/callback` as an *OAuth2 redirect URI*.

```shell
$ cd libra/
$ cp ./config/secret.example.json ./config/secret.json
# Edit ./config/secret.json and set your Dropbox app key/secret
$ npm install
$ ./scripts/make-certs.sh
$ npm run start
```

Go to [https://localhost:3000/](https://localhost:3000/)
