import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json'
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import analyze from 'rollup-plugin-analyzer';
import packageJson from "./package.json" assert { type: "json" };

const limitBytes = 6e6;

const onAnalysis = ({ bundleSize }) => {
	if (bundleSize < limitBytes) return
	console.log(`Bundle size exceeds ${limitBytes/1024} kb: ${bundleSize/1024} kb`)
	return process.exit(1)
}

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true
			},
		],
		plugins: [
			peerDepsExternal(),
			nodeResolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json", sourceMap: true }),
			postcss(),
			terser(),
			image(),
			json(),
			analyze({ onAnalysis, summaryOnly: true })
		]
	},
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [dts()],
		external: [/\.css$/]
	},
];