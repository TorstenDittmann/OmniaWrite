import {
  scenes,
  chapters
} from "../../stores";

let dragSourceElement = null;
let dragSourceType = null;
let isDragging = false;


export function initDraggable(listItems) {
  listItems.forEach(item => {
    addDnDHandlers(item);
  })
}

function handleStart(e) {
  console.log(this)
  if (!isDragging) {
    if (!this.draggable) {
      e.preventDefault();
      return;
    }
    isDragging = true;
    dragSourceElement = this;
    dragSourceType = this.dataset.type;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text", this.outerHTML);
    this.classList.add("draggingElement");
  }
}

function handleOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  if (dragSourceType == this.dataset.type) {
    this.classList.add("over");
    e.dataTransfer.dropEffect = "move";
  }
  return false;
}

function handleLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  console.log("drop");
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  let srcElement = "undefined";
  if (typeof e.srcElement.parentElement.dataset.id !== "undefined") {
    srcElement = e.srcElement.parentElement;
  } else if (typeof e.srcElement.dataset.id !== "undefined") {
    srcElement = e.srcElement;
  }

  if (dragSourceElement != this && srcElement != undefined) {
    if (dragSourceType == "chapter") {
      chapters.moveChapter(dragSourceElement.dataset.project, dragSourceElement.dataset.id, srcElement.dataset.id);
    } else if (dragSourceType == "scene") {
      scenes.moveScene(dragSourceElement.dataset.chapter, dragSourceElement.dataset.id, srcElement.dataset.chapter, srcElement.dataset.id);
    }
  }
  this.classList.remove("over");
  this.setAttribute("draggable", false);
  return false;
}

function handleEnd(e) {

  isDragging = false;
  this.classList.remove("over");
  this.classList.remove("draggingElement");
  this.setAttribute("draggable", false);
}

function handleOnDrop(e) {
  e.preventDefault();
  e.stopPropagation();
}

function addDnDHandlers(elem) {
  elem.addEventListener("dragstart", handleStart, false);
  elem.addEventListener("dragover", handleOver, false);
  elem.addEventListener("dragleave", handleLeave, false);
  elem.addEventListener("drop", handleDrop, false);
  elem.addEventListener("ondrop", handleOnDrop, false);
  elem.addEventListener("dragend", handleEnd, false);

}
