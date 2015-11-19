export function formatTimestamp(ts) {
    const date = new Date(ts);

    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();

    return `${d}/${m}/${y}`;
}
