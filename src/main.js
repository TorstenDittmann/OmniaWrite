import App from "./App.svelte";

import {
	addMessages,
	setInitialLocale
} from "svelte-i18n";

import en from "./lang/en.json";
import de from "./lang/de.json";

addMessages("en", en);
addMessages("de", de);

setInitialLocale({
	fallback: "en"
});

const app = new App({
	target: document.body
});

export default app;