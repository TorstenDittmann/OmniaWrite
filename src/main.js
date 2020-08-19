import { register, init } from "svelte-i18n";
import pkg from "../package.json";

import App from "./App.svelte";

import "normalize.css";
import "./css/index.scss";

register("en", () => import(/* webpackChunkName: "en" */"./lang/en.json"));
register("de", () => import(/* webpackChunkName: "de" */"./lang/de.json"));

init({
	fallbackLocale: "en",
	initialLocale: JSON.parse(localStorage.getItem("settings")).language || "en"
});


const app = new App({
	target: document.body,
	props: {
		version: pkg.version
	}
});

export default app;