/* eslint-disable no-undef */
import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import builtins from "rollup-plugin-node-builtins";
import json from "@rollup/plugin-json";
import globals from "rollup-plugin-node-globals";
import scss from "rollup-plugin-scss";
import copy from "rollup-plugin-copy";
import conditional from "rollup-plugin-conditional";



import {
	terser
} from "rollup-plugin-terser";
const {
	generateSW
} = require("rollup-plugin-workbox");

const workboxConfig = require("./workbox-config.js")

// eslint-disable-next-line no-undef
const production = !process.env.ROLLUP_WATCH;
const isCordova = process.argv.includes("--config-cordova");
const isDeskgap = process.argv.includes("--config-deskgap");

export default {
	input: "src/main.js",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "public/bundle.js"
	},
	plugins: [
		replace({
			__api_id__: process.env.API_ID,
			__api_key__: process.env.API_KEY
		}),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write("public/bundle.css");
			}
		}),
		scss({
			output: "public/main.css"
		}),


		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			preferBuiltins: true,
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
		production && terser(),

		conditional(isCordova, [
			copy({
				targets: [{
					src: "public/index_cordova.html",
					dest: "cordova/www",
					rename: "index.html"
				},
				{
					src: ["public/*.woff", "public/*.woff2", "public/*.eot", "public/*.svg", "public/*.ttf", "public/*.eot"],
					dest: "cordova/www",
				},
				{
					src: ["public/bundle.js", "public/main.css", "public/bundle.css", "public/logo.png"],
					dest: "cordova/www"
				},
				{
					src: "public/templates/",
					dest: "cordova/www"
				}
				]
			})
		]),
		conditional(isDeskgap, [
			copy({
				targets: [{
					src: "public/index_cordova.html",
					dest: "deskgap",
					rename: "index.html"
				},
				{
					src: ["public/*.woff", "public/*.woff2", "public/*.eot", "public/*.svg", "public/*.ttf", "public/*.eot"],
					dest: "deskgap",
				},
				{
					src: ["public/bundle.js", "public/main.css", "public/bundle.css", "public/logo.png"],
					dest: "deskgap",
				},
				{
					src: "public/templates/",
					dest: "deskgap",
				}
				]
			})
		])
	],
	watch: {
		clearScreen: false
	},
	onwarn(warning, rollupWarn) {
		if (
			warning.code !== "CIRCULAR_DEPENDENCY" &&
			warning.code !== "THIS_IS_UNDEFINED" &&
			warning.code !== "EVAL"
		) {
			rollupWarn(warning.code);
		}
	}
};