import * as Sentry from "@sentry/browser";

import "normalize.css";
import "./css/index.scss";

import App from "./App.svelte";
import { register, init } from "svelte-i18n";

register("en", () => import("./lang/en.json"));
register("de", () => import("./lang/de.json"));
register("pt", () => import("./lang/pt.json"));

init({
	fallbackLocale: "en",
	initialLocale: "en"
});

Sentry.init({ dsn: "https://23916d0950d744b49ded80f0177467a5@sentry.io/2319182" });

const app = new App({
	target: document.body,
	props: {
		version: "1.0.4"
	}
});

export default app;