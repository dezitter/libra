import url from 'url';

export function getAuthURL(options) {
    return url.format({
        protocol: 'https',
        hostname: 'www.dropbox.com',
        pathname: '1/oauth2/authorize',
        query: {
            response_type: 'code',
            client_id: options.client_id,
            redirect_uri: options.redirect_uri
        }
    });
}
