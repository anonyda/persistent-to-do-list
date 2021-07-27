# Persistent To Do List
The key feature to this To Do List is that, it is persistent and stores your previous tasks and its completion states even after browser reload. 
It uses [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for storing your tasks. The page is styled using custom CSS.

## Live Link 
[https://anonyda.github.io/persistent-to-do-list/](https://anonyda.github.io/persistent-to-do-list/)

## The Logic
1. Add new Task
2. Strike Task if completed
3. Delete Task
4. Update Task Content
5. Save Tasks on Local Storage

## Adding Tasks
When you add a task, it creates a new Task Object through a constructor, renders it to the DOM, and adds that task to the local storage.

## Rendering Tasks
When the browser loads for the first time, it checks for ```tasks``` array in the Local Storage. It does not find anything in the Local Storage.
Therefore, it initializes an empty array. <br>
The ```addToDom()``` function takes a task object as in input and renders it to the DOM by creating relevant DOM nodes. <br> <br>
When the browser reloads, it calls ```getFromLocalStorage()``` function. This function is responsible for fetching tasks from the Local Storage, and adding each one of them to the DOM.

## Updating Tasks
Updating tasks includes both, striking the task when completed, and changing the task content. These updates are rendered on the DOM and stored in the Local Storage as well, so that they are persistent on page reloads.

### Concepts Applied
<li> DOM Manipulation with JavaScript
<li> Local Browser Storage
<li> JavaScript Constructors
<li> ES6 Functions
<li> Git
