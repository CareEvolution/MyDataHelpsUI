declare module "*.svg" {
	const content: any;
	export default content;
}

declare module "*.png" {
	const content: any;
	export default content;
}

// apca-w3 ships no type definitions; only the pieces used by colorDocs/scripts are declared.
declare module "apca-w3" {
	export function sRGBtoY(rgb: number[]): number;
	export function APCAcontrast(textY: number, backgroundY: number, places?: number): number;
	export function calcAPCA(text: string | number[], background: string | number[], places?: number): number;
}