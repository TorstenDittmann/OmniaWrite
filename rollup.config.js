import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import builtins from "rollup-plugin-node-builtins";
import json from '@rollup/plugin-json';
import globals from "rollup-plugin-node-globals";
import {
	terser
} from "rollup-plugin-terser";
const {
	generateSW
} = require('rollup-plugin-workbox');

const workboxConfig = require('./workbox-config.js')

// eslint-disable-next-line no-undef
const production = !process.env.ROLLUP_WATCH;

export default {
	input: "src/main.js",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "public/bundle.js"
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write("public/bundle.css");
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === "svelte" || importee.startsWith("svelte/")
		}),
		commonjs(),
		globals(),
		builtins(),
		json(),
		generateSW(workboxConfig),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload("public"),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	/*
	external: [
		'electron',
		'fs',
		'path',
		'os'
	],*/
	watch: {
		clearScreen: false
	}
};