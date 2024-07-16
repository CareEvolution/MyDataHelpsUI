declare module "*.svg" {
	const content: any;
	export default content;
}

declare module "*.png" {
	const content: any;
	export default content;
}

declare module "*?raw" {
    const content: string;
    export default content;
}