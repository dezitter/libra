export function buildRedirectURI(options) {
    const { port, protocol, hostname } = options.serverCfg;
    const redirect_path = options.redirectPath;

    return `${protocol}://${hostname}:${port}${redirect_path}`;
}
