import * as Sentry from "@sentry/browser";

import "normalize.css";
import "./css/index.scss";

import App from "./App.svelte";

import {
	addMessages,
	init
} from "svelte-i18n";

import en from "./lang/en.json";
import de from "./lang/de.json";

addMessages("en", en);
addMessages("de", de);

init({
	fallback: "en"
});


Sentry.init({ dsn: "https://23916d0950d744b49ded80f0177467a5@sentry.io/2319182" });

const app = new App({
	target: document.body,
	props: {
		version: "0.1.1"
	}
});

export default app;