import './style.css';
import { Todo } from './todo-item.js';
import { Project } from './project.js';
import { showTitle, showProjectList, showProject, showHome, refreshMain, delTodoCard } from './display-controller.js';
import { toDate } from 'date-fns';

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

// function to dynamically add project list to the select box
// to add new todos to existing projects
function appendProjectList() {
    const selectRow = document.createElement('div');
    selectRow.classList.add('select-row');

    const selectProject = document.createElement('div');
    selectProject.textContent = 'Add to:'
    selectRow.appendChild(selectProject);

    const selectBox = document.createElement('select');
    selectBox.setAttribute('id', 'select-project');
    selectBox.setAttribute('name', 'select-project');

    for (const project of PROJECTS) {
        const option = document.createElement('option');
        option.textContent = project.title;
        selectBox.appendChild(option);
    }

    selectRow.appendChild(selectBox);
    const oldSelectRow = document.querySelector('.select-row');
    todoForm.removeChild(oldSelectRow);

    const btnContainer = document.querySelector('.btn-container');
    todoForm.insertBefore(selectRow, btnContainer);
}

newTodoBtn.addEventListener('click', () => {
    appendProjectList();
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
            dueDate = dueDate.valueAsDate.toISOString().replace('.000Z', '');
        } else {
            dueDate = dueDate.valueAsDate;
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

        // **Need to implement way to refresh to current page after adding
        refreshMain();
        showHome(PROJECTS);
    }
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


// delete (complete) function for todos
// make it into a function and call it every time display is refreshed...
/*
function makeDelBtn() {
    const delBtn = document.querySelectorAll('.complete');
    delBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            for (const project of PROJECTS) {
                if (project.title === btn.getAttribute('project-title')) {
                    project.delTodo(btn.getAttribute('index'));
                }
            }
        });
    });
}
    */
