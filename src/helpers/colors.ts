export type ColorDefinition = string | { lightMode?: string, darkMode?: string }

function resolveColorInner(colorScheme: 'light' | 'dark', colorDefinition?: ColorDefinition): string | undefined {
	if (!colorDefinition) {
		return undefined;
	}
	if (typeof colorDefinition === 'string' || colorDefinition instanceof String) {
		return colorDefinition as string;
	}
	if (colorScheme === 'dark' && colorDefinition.darkMode) {
		return colorDefinition.darkMode;
	}
	return colorDefinition.lightMode || colorDefinition.darkMode;
}

function addAlpha(hexColor: string, alpha: number): string | undefined {
	if (alpha < 0 || alpha > 1) {
		return hexColor;
	}
	return `${hexColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
}

export function resolveColor(colorScheme: 'light' | 'dark', colorDefinition?: ColorDefinition, alpha?: number): string | undefined {
	let resolvedColor = resolveColorInner(colorScheme, colorDefinition);
	if (resolvedColor && alpha) {
		resolvedColor = addAlpha(resolvedColor, alpha);
	}
	return resolvedColor;
}