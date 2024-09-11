import "./style.css";
import { Todo } from "./todo-item.js";
import { Project } from "./project.js";
import {
  showProjectList,
  showHome,
  refreshMain,
  refreshProjectList,
  appendProjectList,
} from "./display-controller.js";
export { PROJECTS, saveProjects };

const PROJECTS = []; // store all projects here

// Check for localStorage data and load them
if (localStorage.length != 0) {
  loadProject();
} else {
  const defaultGroup = new Project("Default Group");
  PROJECTS.push(defaultGroup);
}

function loadProject() {
  const projectData = JSON.parse(localStorage.getItem("saveProject"));
  for (const project of projectData) {
    const newProject = new Project(project["title"]);
    for (const item of project.todoArray) {
      newProject.addTodo(item);
    }

    PROJECTS.push(newProject);
  }
}

// Save PROJECTS to localStorage
function saveProjects() {
  const projectString = JSON.stringify(PROJECTS);
  localStorage.setItem("saveProject", projectString);
}

// My Projects on the sidebar is home button
const myProjects = document.querySelector(".project-home");
myProjects.addEventListener("click", () => {
  refreshMain();
  showHome(PROJECTS);
});

// function for new task dialog
const newTodoDialog = document.querySelector(".new-todo-dialog");
const newTodoBtn = document.querySelector(".add-todo");
const todoForm = document.getElementById("add-todo-form");

newTodoBtn.addEventListener("click", () => {
  appendProjectList(PROJECTS, "add");
  newTodoDialog.showModal();
});

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newTodoDialog.close();
});

const addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  todoForm.reportValidity();
  if (todoForm.checkValidity()) {
    const title = document.getElementById("title");
    const notes = document.getElementById("notes");
    let dueDate = document.getElementById("due-date");
    if (dueDate.valueAsDate) {
      // resolve date discrepancy from the date picker
      dueDate = new Date(
        dueDate.valueAsDate.toISOString().replace(".000Z", ""),
      );
    } else {
      dueDate = false;
    }

    const selectProject = document.getElementById("select-project");
    const newTodo = new Todo(title.value, notes.value, dueDate);
    // which project to push to
    for (const project of PROJECTS) {
      if (project.title === selectProject.value) {
        project.addTodo(newTodo);
      }
    }

    todoForm.reset();
    newTodoDialog.close();

    // Save the PROJECT array to localStorage after adding new todo
    saveProjects();
    refreshMain();
    showHome(PROJECTS);
  }
});

// New Project dialog function
const projectDialog = document.querySelector(".new-project-dialog");
const newProjectBtn = document.querySelector(".new-project");
const projectForm = document.getElementById("new-project-form");

newProjectBtn.addEventListener("click", () => {
  projectDialog.showModal();
});

const cancelProjectBtn = document.querySelector(".project-close-btn");
cancelProjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  projectDialog.close();
});

const createProjectBtn = document.querySelector(".project-create-btn");
createProjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newProjectName = document.getElementById("project-title");
  for (const project of PROJECTS) {
    if (project.title.toLowerCase() == newProjectName.value.toLowerCase()) {
      alert(`"${newProjectName.value}" already exists.`);
      return;
    }
  }

  PROJECTS.push(new Project(newProjectName.value));
  projectForm.reset();
  projectDialog.close();
  refreshProjectList(PROJECTS);
  refreshMain();
  showHome(PROJECTS);
});

showProjectList(PROJECTS);
showHome(PROJECTS);
