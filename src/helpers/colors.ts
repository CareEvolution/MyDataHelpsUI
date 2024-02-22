export type ColorDefinition = string | { lightMode?: string, darkMode?: string }

export function resolveColor(colorScheme: "light" | "dark", colorDefinition?: ColorDefinition): string | undefined {
    if (!colorDefinition) {
        return undefined;
    }
    if (typeof colorDefinition === 'string' || colorDefinition instanceof String) {
        return colorDefinition as string;
    }
    if (colorScheme === "dark" && colorDefinition.darkMode) {
        return colorDefinition.darkMode;
    }
    return colorDefinition.lightMode || colorDefinition.darkMode;
}