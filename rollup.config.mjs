import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import analyze from 'rollup-plugin-analyzer';

const limitBytes = 6.1e6;

const onAnalysis = ({ bundleSize }) => {
	if (bundleSize < limitBytes) return;
	console.log(`Bundle size exceeds ${limitBytes / 1024} kb: ${bundleSize / 1024} kb`);
	process.exit(1);
};

const manualChunks = {
	prettier: ['prettier/standalone', 'prettier/plugins/babel', 'prettier/plugins/estree']
};

const getPlugins = ({ browser = false, minify = false } = {}) => [
	peerDepsExternal(),
	nodeResolve({ browser }),
	commonjs(),
	typescript({ tsconfig: "./tsconfig.json" }),
	postcss(),
	image(),
	json(),
	...(minify ? [terser()] : []),
	...(minify ? [analyze({ onAnalysis, summaryOnly: true })] : [])
];

export default [
	{
		input: "src/index.ts",
		output: {
			dir: "dist/cjs",
			format: "cjs",
			sourcemap: true,
			manualChunks
		},
		plugins: getPlugins()
	},
	{
		input: "src/index.ts",
		output: {
			dir: "dist/esm",
			format: "esm",
			sourcemap: true,
			manualChunks
		},
		plugins: getPlugins()
	},
	{
		input: "src/index.ts",
		output: {
			dir: "dist/browser",
			format: "esm",
			sourcemap: true,
			manualChunks
		},
		plugins: getPlugins({ browser: true, minify: true })
	},
	{
		input: "src/index.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [dts()],
		external: [/\.css$/, /\.stories.tsx$/, /\.previewData.ts$/]
	}
];
