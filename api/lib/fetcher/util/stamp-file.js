export function stampFile(file, stamp=new Date()) {
    file['cachedAt'] = stamp;
    return file;
}
