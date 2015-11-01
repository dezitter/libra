import url from 'url';

export function getTokenURL() {
    return url.format({
        protocol: 'https',
        hostname: 'api.dropboxapi.com',
        pathname: '1/oauth2/token'
    });
}
