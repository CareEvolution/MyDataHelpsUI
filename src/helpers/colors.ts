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

var colorAssortment = [
    "#c4291c",
    "#e35c33",
    "#5db37e",
    "#429bdf",
    "#7b88c6",
    "#616161",
    "#d98177",
    "#f5b722",
    "#397d49",
    "#4154af",
    "#8333a4",
    "#f686ae",
    "#af9fd7",
    "#6e4b3f",
    "#9d9083",
    "#565656",
    "#eec04c",
    "#2dad6e",
    "#d21a55",
    "#0e753b",
    "#008b7d",
    "#0790e1",
    "#3a7af2",
    "#3747ac",
    "#ee8800",
    "#6e7bc4",
    "#f2471c",
    "#945ea6",
    "#8321a0",
    "#e0bc39",
    "#ed6100",
    "#71aa3a",
    "#a3144d"
];

export function getColorFromAssortment(index: number): string {
    return colorAssortment[index % colorAssortment.length];
}
