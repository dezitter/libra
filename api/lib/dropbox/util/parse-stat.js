export function parseStat(stat) {
    return Object.assign(
        {}, { name: stat.name }, stat.toJSON()
    );
}
