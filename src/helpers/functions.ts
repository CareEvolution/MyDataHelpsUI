export function noop() {
}

export function safeValues<T>(partialRecord: Partial<Record<string, T>> | undefined): T[] {
    if (!partialRecord) return [];
    return Object.values(partialRecord).filter((value): value is T => value !== undefined && value !== null);
}

export function safeEntries<T>(partialRecord: Partial<Record<string, T>> | undefined): [string, T][] {
    if (!partialRecord) return [];
    return Object.entries(partialRecord).filter((entry): entry is [string, T] => entry[1] !== undefined && entry[1] !== null);
}