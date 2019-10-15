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

function stateState() {
    const {
        subscribe,
        update
    } = writable(JSON.parse(
        localStorage.getItem("state") || ""
    ));

    return {
        subscribe,
        setCurrentTitle: (title) => update(n => {
            n.currentTitle = title;
            return n;
        }),
        setCurrentUser: (user) => update(n => {
            n.currentUser = user;
            return n;
        }),
        setCurrentProject: (project) => update(n => {
            n.currentProject = project;
            return n;
        })
    }
}

function stateProjects() {
    const {
        subscribe,
        update
    } = writable(JSON.parse(
        localStorage.getItem("projects") || ""
    ));

    return {
        subscribe,
        createProject: (title) => update(n => {
            return n.concat([{
                id: (Math.floor(Math.random() * 999) + 100),
                title: title
            }]);
        })
    }
}

function stateChapters() {
    const {
        subscribe,
        update
    } = writable(JSON.parse(
        localStorage.getItem("chapters") || ""
    ));

    return {
        subscribe,
        createChapter: (project, title) => update(n => {
            console.log(n);
            return n.concat([{
                id: (Math.floor(Math.random() * 999) + 100),
                project: project,
                title: title,
                order: n.length,
                ui: {
                    open: true
                }
            }]);
        }),
        setChapterTitle: (id, title) => update(n => {
            n[n.findIndex(c => c.id == id)].title = title;
            return n;
        }),
        removeChapter: (id) => update(n => {
            return n.filter(n => n.id !== id)
        })
    }
}

export const scenes = writable(
    JSON.parse(
        localStorage.getItem("scenes") || ""
    ));

export const tabs = writable(
    JSON.parse(
        localStorage.getItem("tabs") || ""
    ));

export const state = stateState();
export const projects = stateProjects();
export const chapters = stateChapters();


projects.subscribe(val => localStorage.setItem("projects", JSON.stringify(val)));
chapters.subscribe(val => localStorage.setItem("chapters", JSON.stringify(val)));
state.subscribe(val => localStorage.setItem("state", JSON.stringify(val)));
tabs.subscribe(val => localStorage.setItem("tabs", JSON.stringify(val)));
scenes.subscribe(val => localStorage.setItem("scenes", JSON.stringify(val)));