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

const app = new App({
	target: document.body,
	props: {
		version: "0.0.1"
	}
});

export default app;