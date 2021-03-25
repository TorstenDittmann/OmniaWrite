import { register, init } from "svelte-i18n";
import pkg from "../package.json";

import App from "./App.svelte";

import "normalize.css";
import "./css/index.scss";

register("en", () => import(/* webpackChunkName: "en" */ "./lang/en.json"));
register("de", () => import(/* webpackChunkName: "de" */ "./lang/de.json"));
register("es", () => import(/* webpackChunkName: "es" */ "./lang/es.json"));
register("fi", () => import(/* webpackChunkName: "fi" */ "./lang/fi.json"));
register("nl", () => import(/* webpackChunkName: "nl" */ "./lang/nl.json"));
register("pt", () => import(/* webpackChunkName: "pt" */ "./lang/pt.json"));
register("ru", () => import(/* webpackChunkName: "ru" */ "./lang/ru.json"));
register("tr", () => import(/* webpackChunkName: "tr" */ "./lang/tr.json"));
register("ja", () => import(/* webpackChunkName: "ja" */ "./lang/ja.json"));
register("sv", () => import(/* webpackChunkName: "sv" */ "./lang/sv.json"));
register("ur", () => import(/* webpackChunkName: "ur" */ "./lang/ur.json"));
register("zh", () => import(/* webpackChunkName: "zh" */ "./lang/zh.json"));

init({
  fallbackLocale: "en",
  initialLocale: JSON.parse(localStorage.getItem("settings")).language || "en",
});

const app = new App({
  target: document.body,
  props: {
    version: pkg.version,
  },
});

export default app;
