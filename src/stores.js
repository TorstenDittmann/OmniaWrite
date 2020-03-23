import {
    writable
} from "svelte/store";

const defaultIntern = {
    version: "alpha",
    installed: false
};

const defaultSettings = {
    theme: "dark",
    language: "en"
}

if (localStorage.getItem("intern") === null) {
    localStorage.setItem("intern", JSON.stringify(defaultIntern));
    localStorage.setItem("settings", JSON.stringify(defaultSettings));
    localStorage.setItem("state", "{}");
    localStorage.setItem("projects", "[]");
    localStorage.setItem("chapters", "[]");
    localStorage.setItem("scenes", "[]");
    localStorage.setItem("tabs", "[]");
    localStorage.setItem("cards", "[]");
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
        setCurrentUser: (user, email, token) => update(n => {
            n.currentUser = user;
            n.currentUserEmail = email;
            n.currentUserToken = token;
            return n;
        }),
        /**
         * Sets currently active project.
         * @param project Project ID.
         */
        setCurrentProject: (project) => update(n => {
            n.currentProject = project;
            return n;
        }),
        /**
         * Updates Cloud timestamp.
         */
        updateCloudTimestamp: (timestamp) => update(n => {
            n.lastCloudSave = timestamp / 1000;
            n.lastLocalSave = timestamp / 1000;
            return n;
        }),
        /**
         * Sets Local Timestamp to current time.
         */
        updateLocalTimestamp: () => update(n => {
            n.lastLocalSave = (+new Date) / 1000;
            return n;
        }),
        setLogin: (bool) => update(n => {
            n.isUserLoggedIn = bool;
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
         * @returns ID of the created project.
         */
        createProject: (title) => {
            updateLocalTimestamp();
            let newProjectId = getRandomNumber();
            update(n => {
                return n.concat([{
                    id: newProjectId,
                    title: title
                }]);
            });
            return newProjectId;
        },
        /**
         * Sets project title.
         * @param id ID of the project.
         * @param title New title of project.
         */
        setProjectTitle: (id, title) => update(n => {
            updateLocalTimestamp();
            n[n.findIndex(p => p.id == id)].title = title;
            return n;
        }),
        /**
         * Sets project last opened timestamp.
         * @param id ID of the project.
         */
        updateProjectTimestamp: (id) => update(n => {
            n[n.findIndex(p => p.id == id)].lastOpen = Math.round((new Date()).getTime() / 1000);
            return n;
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
            updateLocalTimestamp();
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
            updateLocalTimestamp();
            n[n.findIndex(c => c.id == id)].title = title;
            return n;
        }),
        /**
         * Removes chapter.
         * @param id ID of the chapter.
         */
        removeChapter: (id) => update(n => {
            updateLocalTimestamp();
            return n.filter(n => n.id !== id)
        }),
        moveChapter: (project, from, to) => update(n => {
            let temp = n.filter(p => p.project == project).sort((a, b) => a.order - b.order);
            temp.splice(temp.findIndex(a => a.id == to), 0, temp.splice(temp.findIndex(a => a.id == from), 1)[0]);
            temp.forEach((ele, i) => {
                n[n.findIndex(a => ele.id == a.id && project == a.project)].order = i;
            });
            return n;
        }),
        /**
         * Toggles sidebar state of a chapter => Open/Closed.
         * @param id ID of the chapter.
         */
        toggleChapterInSidebar: (id) => update(n => {
            updateLocalTimestamp();
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
            updateLocalTimestamp();
            return n.concat([{
                id: getRandomNumber(),
                chapter: chapter,
                title: title,
                order: n.length
            }]);
        }),
        /**
         * Sets scene title.
         * @param id ID of the scene.
         * @param title New title of scene.
         */
        setSceneTitle: (id, title) => update(n => {
            updateLocalTimestamp();
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
            updateLocalTimestamp();
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
            updateLocalTimestamp();
            return n.filter(n => n.id !== id)
        }),
        moveScene: (fromChapter, fromId, toChapter, toId) => update(n => {
            let tempFrom = n.filter(p => p.chapter == fromChapter).sort((a, b) => a.order - b.order);
            let tempTo = n.filter(p => p.chapter == toChapter).sort((a, b) => a.order - b.order);

            let tempScene = tempFrom.splice(tempFrom.findIndex(a => a.id == fromId), 1)[0];
            if (fromChapter == toChapter) {
                tempTo.splice(tempTo.findIndex(a => a.id == fromId), 1);
            }
            tempTo.splice(tempTo.findIndex(a => a.id == toId), 0, tempScene);

            n[n.findIndex(a => fromId == a.id && fromChapter == a.chapter)].chapter = toChapter;
            tempTo.forEach((ele, i) => {
                n[n.findIndex(a => ele.id == a.id && toChapter == a.chapter)].order = i;
            });

            return n;
        }),
        /**
         * Orders the position.
         * @param id id of item
         * @param direction true = up|false = down
         */
        orderScene: (id, direction) => update(n => {
            let indexWith;
            let index = n.findIndex(c => c.id == id);
            if (direction) {
                indexWith = n.findIndex(c => c.order == (n[index].order - 1) && c.chapter == n[index].chapter);
            } else {
                indexWith = n.findIndex(c => c.order == (n[index].order + 1) && c.chapter == n[index].chapter);
            }
            [n[index].order, n[indexWith].order] = [n[indexWith].order, n[index].order];
            return n;
        }),
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

function storeCards() {
    const {
        subscribe,
        update
    } = writable(JSON.parse(
        localStorage.getItem("cards") || ""
    ));
    return {
        subscribe,
        /**
         * Creates new tab.
         * @param project Project ID.
         * @param title Title.
         * @param content Content.
         * @param showTooltip Show tooltip while writing.
         */
        createCard: (project, title, content, showTooltip) => update(n => {
            return n.concat([{
                id: getRandomNumber(),
                project: project,
                title: title,
                content: content,
                showTooltip: showTooltip
            }]);
        }),
        setCard: (card) => update(n => {
            updateLocalTimestamp();
            let index = n.findIndex(c => c.id == card.id);
            n[index] = card;
            return n;
        }),
        /**
         * Sets scene card.
         * @param id ID of the card.
         * @param title New title of card.
         */
        setCardTitle: (id, title) => update(n => {
            updateLocalTimestamp();
            let index = n.findIndex(c => c.id == id);
            n[index].title = title;
            return n;
        }),
        /**
         * Sets card content.
         * @param id ID of the card.
         * @param title New content of card.
         */
        setCardContent: (id, content) => update(n => {
            updateLocalTimestamp();
            let index = n.findIndex(c => c.id == id);
            n[index].content = content;
            return n;
        }),
        /**
         * Removes card.
         * @param id ID of the tab.
         */
        removeCard: (id) => update(n => {
            return n.filter(n => n.id !== id)
        })
    }
}

function updateLocalTimestamp() {
    state.updateLocalTimestamp();
}

export const state = storeState();
export const projects = storeProjects();
export const chapters = storeChapters();
export const scenes = storeScenes();
export const tabs = storeTabs();
export const cards = storeCards();

export const settings = writable(JSON.parse(localStorage.getItem("settings") || "{}"));
export const intern = writable(JSON.parse(localStorage.getItem("intern") || "{}"));


projects.subscribe(val => localStorage.setItem("projects", JSON.stringify(val)));
chapters.subscribe(val => localStorage.setItem("chapters", JSON.stringify(val)));
state.subscribe(val => localStorage.setItem("state", JSON.stringify(val)));
tabs.subscribe(val => localStorage.setItem("tabs", JSON.stringify(val)));
scenes.subscribe(val => localStorage.setItem("scenes", JSON.stringify(val)));
cards.subscribe(val => localStorage.setItem("cards", JSON.stringify(val)));
settings.subscribe(val => localStorage.setItem("settings", JSON.stringify(val)));
intern.subscribe(val => localStorage.setItem("intern", JSON.stringify(val)));