import * as Sentry from "@sentry/browser";
import { register, init } from "svelte-i18n";
import pkg from "../package.json";

import App from "./App.svelte";

import "normalize.css";
import "./css/index.scss";

register("en", () => import(/* webpackChunkName: "en" */"./lang/en.json"));
register("de", () => import(/* webpackChunkName: "de" */"./lang/de.json"));

init({
	fallbackLocale: "en",
	initialLocale: "en"
});

Sentry.init({ dsn: "https://23916d0950d744b49ded80f0177467a5@sentry.io/2319182" });

const app = new App({
	target: document.body,
	props: {
		version: pkg.version
	}
});

export default app;