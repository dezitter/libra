import { parseStat } from 'api/lib/dropbox/util/parse-stat';

export function parseFile(file) {
    const metadata = parseStat(file.stat);

    return Object.assign(metadata, { content: file.content });
}
