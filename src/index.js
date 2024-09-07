import './style.css';
import { Todo } from './todo-item.js';
import { Project } from './project.js';
import { showTitle, showProjectList, showHome, refreshMain, refreshProjectList, appendProjectList } from './display-controller.js';
import { toDate } from 'date-fns';
export { PROJECTS };

const PROJECTS = []; // store all projects here
const defaultGroup = new Project('Default Group');
PROJECTS.push(defaultGroup);

// My Projects on the sidebar is home button
const myProjects = document.querySelector('.project-home');
myProjects.addEventListener('click', () => {
    refreshMain();
    showHome(PROJECTS);
});

// function for new task dialog
const newTodoDialog = document.querySelector('.new-todo-dialog');
const newTodoBtn = document.querySelector('.add-todo');
const todoForm = document.getElementById('add-todo-form');

newTodoBtn.addEventListener('click', () => {
    appendProjectList(PROJECTS, 'add');
    newTodoDialog.showModal();
});

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    newTodoDialog.close();
});

const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    todoForm.reportValidity();
    if (todoForm.checkValidity()) {
        const title = document.getElementById('title');
        const notes = document.getElementById('notes');
        let dueDate = document.getElementById('due-date');
        if (dueDate.valueAsDate) {
            // resolve date discrepancy from the date picker
            dueDate = new Date(dueDate.valueAsDate.toISOString().replace('.000Z', ''));
        } else {
            dueDate = false;
        }
        const selectProject = document.getElementById('select-project');
        const newTodo = new Todo(title.value, notes.value, dueDate);
        // which project to push to
        for (const project of PROJECTS) {
            if (project.title === selectProject.value) {
                project.addTodo(newTodo);
            }
        }
        todoForm.reset();
        newTodoDialog.close();

        refreshMain();
        showHome(PROJECTS);
    }
});

// New Project dialog function
const projectDialog = document.querySelector('.new-project-dialog');
const newProjectBtn = document.querySelector('.new-project');
const projectForm = document.getElementById('new-project-form');

newProjectBtn.addEventListener('click', () => {
    projectDialog.showModal();
});

const cancelProjectBtn = document.querySelector('.project-close-btn');
cancelProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projectDialog.close();
})

const createProjectBtn = document.querySelector('.project-create-btn');
createProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newProjectName = document.getElementById('project-title');
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

// SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO
const test = new Todo('test', 'this is due today', new Date());
const test3 = new Todo('todo3', 'this one is urgent', new Date(), 0);
const test4 = new Todo('anotherone' , 'normal todo but no dueDate');
const last = new Todo('future', 'due date is christmas (months start from 0)', new Date(2024, 11, 25));

const christmas = new Todo('Christmas', 'Merry Christmas', new Date(2024, 11, 25));
const newyear = new Todo('New Year', 'Happy New Year', new Date(2024, 0, 1));

const myProject = new Project('Test Project');
const project2 = new Project('Holidays');
myProject.addTodo(test);
myProject.addTodo(test3);
myProject.addTodo(test4);
myProject.addTodo(last);

project2.addTodo(christmas);
project2.addTodo(newyear);

PROJECTS.push(myProject);
PROJECTS.push(project2);

// SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO SAMPLE TODO

showProjectList(PROJECTS);
showHome(PROJECTS);