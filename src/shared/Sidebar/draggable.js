import {
  state,
  scenes,
  chapters
} from "../../stores";

let dragSourceElement = null;


export function initDraggable(listItems) {
  listItems.forEach(item => {
    addDnDHandlers(item);
  })
}

function handleStart(e) {
  dragSourceElement = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text", this.outerHTML);
  this.classList.add("draggingElement");
  if (dragSourceElement.dataset.type == "chapter") {
    document.querySelectorAll("[data-type=\"scene\"]").forEach(ele => {
      console.log("hier")
      ele.setAttribute("draggable", "false");
    });
  } else if (dragSourceElement.dataset.type == "scene") {
    document.querySelectorAll("[data-type=\"chapter\"]").forEach(ele => {
      ele.setAttribute("draggable", "false");
    });
  }
}

function handleOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.preventDefault();
  this.classList.add("over");
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSourceElement != this && typeof e.srcElement.parentElement.dataset.id !== "undefined") {
    if (dragSourceElement.dataset.type == "chapter") {
      chapters.moveChapter(dragSourceElement.dataset.project, dragSourceElement.dataset.id, e.srcElement.parentElement.dataset.id);
    } else if (dragSourceElement.dataset.type == "scene") {
      console.log("a");
    }
  }
  this.classList.remove("over");
  return false;
}

function handleEnd(e) {
  this.classList.remove("over");
  this.classList.remove("draggingElement");
}

function addDnDHandlers(elem) {
  elem.addEventListener("dragstart", handleStart, false);
  elem.addEventListener("dragover", handleOver, false);
  elem.addEventListener("dragleave", handleLeave, false);
  elem.addEventListener("drop", handleDrop, false);
  elem.addEventListener("dragend", handleEnd, false);

}
