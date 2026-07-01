declare module "*.svg" {
	const content: any;
	export default content;
}

declare module "*.png" {
	const content: any;
	export default content;
}

// BRIDGE — remove once the MyDataHelps.js SDK adds Google Health support.
// The pending @careevolution/mydatahelps-js release adds the googleHealthEnabled flag on
// DataCollectionSettings. Declared here (ambient) so it is visible program-wide until the
// SDK ships it. See src/helpers/daily-data-providers/google-health-namespace.ts.
declare module "@careevolution/mydatahelps-js" {
	interface DataCollectionSettings {
		googleHealthEnabled: boolean;
	}
}