export function formatTimestamp(ts) {
    const date = new Date(ts);

    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    return `${y}/${m}/${d}`;
}
