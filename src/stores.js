import { writable } from "svelte/store";

export const state = writable({
    currentProject: 2556,
    currentUser: "tdittmann-242"
});

export const projects = writable([
{
    id: 2556,
    title: "Mountains of Madness"
}
]);

export const chapters = writable([
    {
        id: 1337,
        project: 2556,
        title: "Chapter 1",
        order: 1,
        ui: {
            open: true
        }
    },
    {
        id: 4711,
        project: 2556,
        title: "Chapter 2",
        order: 2,
        ui: {
            open: true
        }
    }
]);

export const scenes = writable([
    {
        id: 4567,
        chapter: 1337,
        title: "Scene I",
        order: 1,
        content: "1 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem."
    },
    {
        id: 4568,
        chapter: 1337,
        title: "Scene II",
        order: 2,
        content: "2 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem."
    },
    {
        id: 4569,
        chapter: 4711,
        title: "Scene III",
        order: 1,
        content: "3 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem."
    },
    {
        id: 4570,
        chapter: 4711,
        title: "Scene IV",
        order: 2,
        content: "4 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem."
    }
]);

export const tabs = writable([
    {
        id: 991,
        title: "Chapter I - Scene II",
        project: 2556,
        link: "/write/4568"
    },
    {
        id: 995,
        title: "Chapter II - Scene I",
        project: 2556,
        link: "/write/4569"
    }
]);