import {
    writable
} from "svelte/store";


// import PouchDB from "pouchdb";

const defaultIntern = {
    version: "alpha",
    lastCloudSave: null,
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

function getRandomNumber() {
    return Math.floor(Math.random() * 999999);
}

function storeState() {
    const {
        subscribe,
        update
    } = writable(JSON.parse(
        localStorage.getItem("state") || ""
    ));

    return {
        subscribe,
        /**
         * Sets current title.
         * @param title Title to set.
         */
        setCurrentTitle: (title) => update(n => {
            n.currentTitle = title;
            return n;
        }),
        /**
         * Sets current user ID.
         * @param user User ID.
         */
        setCurrentUser: (user) => update(n => {
            n.currentUser = user;
            return n;
        }),
        /**
         * Sets currently active project.
         * @param project Project ID.
         */
        setCurrentProject: (project) => update(n => {
            n.currentProject = project;
            return n;
        })
    }
}

function storeProjects() {
    const {
        subscribe,
        update
    } = writable(JSON.parse(
        localStorage.getItem("projects") || ""
    ));

    return {
        subscribe,
        /**
         * Creates project.
         * @param title Title of the new project.
         */
        createProject: (title) => update(n => {
            return n.concat([{
                id: getRandomNumber(),
                title: title
            }]);
        })
    }
}

function storeChapters() {
    const {
        subscribe,
        update
    } = writable(JSON.parse(
        localStorage.getItem("chapters") || ""
    ));

    return {
        subscribe,
        /**
         * Creates new chapter.
         * @param project Project ID.
         * @param title Title of the new chapter.
         */
        createChapter: (project, title) => update(n => {
            return n.concat([{
                id: getRandomNumber(),
                project: project,
                title: title,
                order: n.length,
                ui: {
                    open: true
                }
            }]);
        }),
        /**
         * Sets chapter title.
         * @param id ID of the chapter.
         * @param title New title of chapter.
         */
        setChapterTitle: (id, title) => update(n => {
            n[n.findIndex(c => c.id == id)].title = title;
            return n;
        }),
        /**
         * Removes chapter.
         * @param id ID of the chapter.
         */
        removeChapter: (id) => update(n => {
            return n.filter(n => n.id !== id)
        }),
        /**
         * Toggles sidebar state of a chapter => Open/Closed.
         * @param id ID of the chapter.
         */
        toggleChapterInSidebar: (id) => update(n => {
            let index = n.findIndex(c => c.id == id);
            n[index].ui.open = !n[index].ui.open;
            return n;
        })
    }
}

function storeScenes() {
    const {
        subscribe,
        update
    } = writable(JSON.parse(
        localStorage.getItem("scenes") || ""
    ));

    return {
        subscribe,
        /**
         * Creates new scene.
         * @param chapter Chapter ID.
         * @param title Title of the new chapter.
         */
        createScene: (chapter, title) => update(n => {
            return n.concat([{
                id: getRandomNumber(),
                chapter: chapter,
                title: title,
                order: n.length,
                content: ""
            }]);
        }),
        /**
         * Sets scene title.
         * @param id ID of the scene.
         * @param title New title of scene.
         */
        setSceneTitle: (id, title) => update(n => {
            let index = n.findIndex(c => c.id == id);
            n[index].title = title;
            n[index].lastEdit = Math.round((new Date()).getTime() / 1000);
            return n;
        }),
        /**
         * Sets scene content.
         * @param id ID of the scene.
         * @param title New content of scene.
         */
        setSceneContent: (id, content) => update(n => {
            let index = n.findIndex(c => c.id == id);
            n[index].content = content;
            n[index].lastEdit = Math.round((new Date()).getTime() / 1000);
            return n;
        }),
        /**
         * Removes scene.
         * @param id ID of the scene.
         */
        removeScene: (id) => update(n => {
            return n.filter(n => n.id !== id)
        })
    }
}

function storeTabs() {
    const {
        subscribe,
        update
    } = writable(JSON.parse(
        localStorage.getItem("tabs") || ""
    ));

    return {
        subscribe,
        /**
         * Creates new tab.
         * @param project Project ID.
         * @param title Title.
         * @param link Relative link to content.
         */
        createTab: (project, title, link) => update(n => {
            return n.concat([{
                id: getRandomNumber(),
                title: title,
                project: project,
                link: link
            }]);
        }),
        /**
         * Removes tab.
         * @param id ID of the tab.
         */
        removeTab: (id) => update(n => {
            return n.filter(n => n.id !== id)
        })
    }
}

export const state = storeState();
export const projects = storeProjects();
export const chapters = storeChapters();
export const scenes = storeScenes();
export const tabs = storeTabs();

projects.subscribe(val => localStorage.setItem("projects", JSON.stringify(val)));
chapters.subscribe(val => localStorage.setItem("chapters", JSON.stringify(val)));
state.subscribe(val => localStorage.setItem("state", JSON.stringify(val)));
tabs.subscribe(val => localStorage.setItem("tabs", JSON.stringify(val)));
scenes.subscribe(val => localStorage.setItem("scenes", JSON.stringify(val)));