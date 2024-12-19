export function tryParseRegex(pattern: string): { success: boolean, regex: RegExp | undefined } {
    try {
        return { success: true, regex: new RegExp(pattern) };
    } catch {
        return { success: false, regex: undefined };
    }
}