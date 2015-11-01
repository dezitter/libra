export function getTokenPayload(options) {
    return {
        code: options.code,
        grant_type: 'authorization_code',
        redirect_uri: options.redirect_uri
    };
}
