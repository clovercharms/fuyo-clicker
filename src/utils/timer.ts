export function calcElapsed(lastLoaded: number, lastUpdate: number) {
    return Math.max(0, Date.now() - Math.max(lastLoaded, lastUpdate));
}
