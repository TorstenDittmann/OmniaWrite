import * as Sentry from "@sentry/browser";

import { register, init } from "svelte-i18n";
import pkg from "../package.json";

import App from "./App.svelte";

import "normalize.css";
import "./css/index.scss";

register("en", () => import(/* webpackChunkName: "en" */ "./lang/en.json"));
register("de", () => import(/* webpackChunkName: "de" */ "./lang/de.json"));
register("es", () => import(/* webpackChunkName: "es" */ "./lang/es.json"));

init({
  fallbackLocale: "en",
  initialLocale: JSON.parse(localStorage.getItem("settings")).language || "en",
});

Sentry.init({
  dsn:
    "https://23916d0950d744b49ded80f0177467a5@o350177.ingest.sentry.io/2319182",
  release: `omniawrite@${pkg.version}`,
});

const app = new App({
  target: document.body,
  props: {
    version: pkg.version,
  },
});

export default app;
