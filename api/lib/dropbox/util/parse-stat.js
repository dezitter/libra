import { parseMetadata } from 'api/lib/dropbox/util/parse-metadata';

export function parseStat(stat) {
    const metadata = parseMetadata(stat.toJSON());

    stat = Object.assign(
        { name: stat.name }, // name not part of the metadata
        metadata
    );

    return stat;
}
