// ==UserScript==
// @name Notion.so Clean Todo Lists - no strikethrough or fading
// @description This script prevents notion from adding a strikethrough and fading checked off items in a todo list.
// @namespace Violentmonkey Scripts
// @match https://www.notion.so/*
// @grant none
// @version 1.0.0
// ==/UserScript==
// 
 
function restyleCheckedTodos(elements){
  elements.forEach((e) => {
    if(e.style.textDecoration == 'line-through' & e.style.opacity == .375){
      e.style.textDecoration = 'none';
      e.style.opacity = 1;
    }
  });
}
 
let config = {
  attributes: true,
  attributeFilter: ["style"],
  childList: true,
  subtree: true
};
 
let observer = new MutationObserver((mutationsList, observer) => {
	// Any elements recently added or edited.
	restyleCheckedTodos(mutationsList.map((m) => m.target));
	// Anything that was missed by the above.
    restyleCheckedTodos(document.querySelectorAll("[contenteditable]"));
});
 
observer.observe(document, config);
