import {
    writable
} from "svelte/store";

const defaultIntern = {
    version: "alpha",
    installed: true
};

if (localStorage.getItem("intern") === null) {
    localStorage.setItem("intern", JSON.stringify(defaultIntern));
    localStorage.setItem("state", "[]");
    localStorage.setItem("projects", "[]");
    localStorage.setItem("chapters", "[]");
    localStorage.setItem("scenes", "[]");
    localStorage.setItem("tabs", "[]");
}

export const state = writable(
    JSON.parse(
        localStorage.getItem("state") || ""
    ));

export const projects = writable(
    JSON.parse(
        localStorage.getItem("projects") || ""
    ));

export const chapters = writable(
    JSON.parse(
        localStorage.getItem("chapters") || ""
    ));

export const scenes = writable(
    JSON.parse(
        localStorage.getItem("scenes") || ""
    ));

export const tabs = writable(
    JSON.parse(
        localStorage.getItem("tabs") || ""
    ));


projects.subscribe(val => localStorage.setItem("projects", JSON.stringify(val)));
chapters.subscribe(val => localStorage.setItem("chapters", JSON.stringify(val)));
state.subscribe(val => localStorage.setItem("state", JSON.stringify(val)));
tabs.subscribe(val => localStorage.setItem("tabs", JSON.stringify(val)));
scenes.subscribe(val => localStorage.setItem("scenes", JSON.stringify(val)));