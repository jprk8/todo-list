// Module to control the DOM/Display
import { format } from 'date-fns';
import { Todo } from './todo-item.js';
import { PROJECTS, saveProjects } from './index.js';
export { showTitle, showProjectList, showHome, refreshMain, refreshProjectList, appendProjectList }

// Show Project lists on the sidebar
function showProjectList(projects) {
    const projectList = document.querySelector('.project-list');
    for (const project of projects) {
        const listItem = document.createElement('li');
        listItem.textContent = `# ${project.title}`;
        projectList.appendChild(listItem);
    }
}

function refreshProjectList(projects) {
    const sidebar = document.querySelector('.sidebar-menu');
    const projectList = document.querySelector('.project-list');
    sidebar.removeChild(projectList);
    const newList = document.createElement('ul');
    newList.classList.add('project-list');
    sidebar.appendChild(newList);
    showProjectList(projects);
}

// Show the name of a project in main title space
function showTitle(project) {
    const title = document.querySelector('.main-title');
    title.textContent = project.title;
}

// Show home page with all todos in all projects listed
function showHome(projects) {
    const title = document.querySelector('.main-title');
    title.textContent = 'My Projects';
    const container = document.querySelector('.main-body');

    for (const project of projects) {
        const projectTitle = document.createElement('div');
        projectTitle.classList.add('subtitle');
        projectTitle.textContent = `# ${project.title}`;
        container.appendChild(projectTitle);

        let index = 0;
        if (project.todoArray.length != 0) {
            for (const todo of project.todoArray) {
                const todoTab = document.createElement('div');
                todoTab.classList.add('todo-tab');
                
                const completeBtn = document.createElement('button');
                completeBtn.classList.add('complete');
                if (todo.complete) completeBtn.style.cssText = 'background-color: green';
                // make data attributes to connect the buttons to DOM and project array
                completeBtn.setAttribute('index', index);
                completeBtn.setAttribute('project-title', project.title);
                completeBtn.addEventListener('click', () => {
                    todo.toggleComplete();
                    refreshMain();
                    showHome(projects);
                });
                
                todoTab.appendChild(completeBtn);
        
                const todoTitle = document.createElement('div');
                todoTitle.classList.add('todo-title');
                todoTitle.textContent = todo.title;
                const todoNotes = document.createElement('div');
                todoNotes.classList.add('todo-notes');
                todoNotes.textContent = todo.notes;
                const todoDate = document.createElement('div');
                todoDate.classList.add('todo-date');
        
                // display items with no due date
                if (todo.dueDate) {
                    const shortDate = format(todo.dueDate, 'MMM d, y');
                    todoDate.textContent = `Due Date: ${shortDate}`;
                } else {
                    todoDate.textContent = 'No Due Date';
                }
        
                const todoCard = document.createElement('div');
                const todoMain = document.createElement('div');
        
                // display urgent/complete cards
                if (todo.complete === true) {
                    todoCard.classList.add('todo-card');
                    todoMain.classList.add('todo-main-complete');
                } else if (todo.priority === 0) {
                    todoCard.classList.add('todo-card-urgent');
                    todoMain.classList.add('todo-main-urgent');
                } else {
                    todoCard.classList.add('todo-card');
                    todoMain.classList.add('todo-main');
                }

                todoMain.appendChild(todoTitle);
                todoMain.appendChild(todoNotes);
                todoMain.appendChild(todoDate);

                const todoMenu = document.createElement('div');
                todoMenu.classList.add('todo-menu');

                // make delete button
                const delBtn = document.createElement('button');
                delBtn.classList.add('del-btn');
                delBtn.textContent = 'X';
                delBtn.setAttribute('index', index);
                delBtn.setAttribute('project-title', project.title);
                delBtn.addEventListener('click', () => {
                    project.delTodo(delBtn.getAttribute('index'));
                    refreshMain();
                    showHome(projects);
                    saveProjects();
                });

                // make edit button to show editor dialog
                const editBtn = document.createElement('button');
                editBtn.classList.add('edit-btn');
                editBtn.textContent = 'E';
                editBtn.setAttribute('project', project.title);
                editBtn.setAttribute('index', index);
                editBtn.addEventListener('click', () => {
                    showEditor(projects,  editBtn.getAttribute('project'), editBtn.getAttribute('index'));
                });

                todoMenu.appendChild(delBtn);
                todoMenu.appendChild(editBtn);

                todoCard.appendChild(todoTab);
                todoCard.appendChild(todoMain);
                todoCard.appendChild(todoMenu);
                container.appendChild(todoCard);

                index++;
            }
        } else {
            const empty = document.createElement('div');
            empty.textContent = '<Empty Project>';
            container.appendChild(empty);
        }
    }
}

// Editor dialog function
const editDialog = document.querySelector('.edit-dialog');
const editTitle = document.getElementById('edit-title');
const editNotes = document.getElementById('edit-notes');
const editDueDate = document.getElementById('edit-due-date');
let editProject;
let editIndex;
let currentProject;

function showEditor(projects, projectName, index) {
    appendProjectList(projects, 'edit');
    editProject = document.getElementById('edit-select-project');
    editIndex = index;
    currentProject = projectName;
    editDialog.showModal();
    // set the current project group to be selected in the drop-down menu
    const options = document.querySelectorAll('#edit-select-project > option');
    for (const item of options) {
        if (item.value === projectName) {
            item.selected = true;
        } else {
            item.selected = false;
        }
    }

    // Display current todo values in the form
    for (const project of projects) {
        if (project.title === projectName) {
            editTitle.value = project.todoArray[index].title;
            editNotes.value = project.todoArray[index].notes;
            const dueDateFormat = project.todoArray[index].dueDate;
            if (dueDateFormat) {
                editDueDate.value = dueDateFormat.toISOString().split('T')[0].slice(0, 10);
            }
        }
    }

    // Display current project above the project selection box
    const showCurrentProject = document.querySelector('.current-project');
    showCurrentProject.textContent = projectName;
}

const editClose = document.querySelector('.edit-close-btn');
editClose.addEventListener('click', (e) => {
    e.preventDefault();
    editDialog.close();
});

const updateBtn = document.querySelector('.update-btn');
updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // resolve datepicker discrepancy
    let editDueDateFormat = false;
    if (editDueDate.valueAsDate) {
        editDueDateFormat = new Date(editDueDate.valueAsDate.toISOString().replace('.000Z', ''));
    }

    if (editProject.value != currentProject) {
        const newTodo = new Todo(editTitle.value, editNotes.value, editDueDateFormat);
        for (const project of PROJECTS) {
            if (project.title === currentProject) {
                project.delTodo(editIndex);
                console.log(`deleting index ${editIndex} from ${currentProject}`);
            } else if (project.title === editProject.value) {
                project.addTodo(newTodo);
                console.log(`adding to ${editProject.value}`);
            }
        }
    } else if (editProject.value === currentProject) {
        for (const project of PROJECTS) {
            if (project.title === currentProject) {
                project.todoArray[editIndex].title = editTitle.value;
                project.todoArray[editIndex].notes = editNotes.value;
                if (editDueDateFormat) {
                    project.todoArray[editIndex].dueDate = new Date(editDueDateFormat);
                } else {
                    project.todoArray[editIndex].dueDate = false;
                }
                console.log('updating existing todo');
            }
        }

    }
    editDialog.close();
    const editForm = document.getElementById('edit-form');
    editForm.reset();
    refreshMain();
    showHome(PROJECTS);
    saveProjects();
});


// Refresh screen
function refreshMain() {
    const main = document.querySelector('.main-container');
    const title = document.querySelector('.main-title');
    const body = document.querySelector('.main-body');
    main.removeChild(title);
    main.removeChild(body);
    const newTitle = document.createElement('div');
    const newBody = document.createElement('div');
    newTitle.classList.add('main-title');
    newBody.classList.add('main-body');
    main.appendChild(newTitle);
    main.appendChild(newBody);
}

function appendProjectList(projects, formName) {
    const selectBox = document.createElement('select');

    for (const project of projects) {
        const option = document.createElement('option');
        option.textContent = project.title;
        selectBox.appendChild(option);
    }

    const addForm = document.getElementById('add-todo-form');
    const editForm = document.getElementById('edit-form');
    const selectRow = document.createElement('div');
    const selectProject = document.createElement('div');
    if (formName == 'add') {
        selectBox.setAttribute('id', 'select-project');
        selectBox.setAttribute('name', 'select-project');
        const oldSelectRow = document.querySelector('.select-row');
        addForm.removeChild(oldSelectRow);
        selectRow.classList.add('select-row');
        selectProject.textContent = 'Add to:';
        selectRow.appendChild(selectProject);
        selectRow.appendChild(selectBox);
        const btnContainer = document.querySelector('.btn-container');
        addForm.insertBefore(selectRow, btnContainer);
        
    } else if (formName == 'edit') {
        selectBox.setAttribute('id', 'edit-select-project');
        selectBox.setAttribute('name', 'edit-select-project');
        const oldSelectRow = document.querySelector('.edit-select-row');
        editForm.removeChild(oldSelectRow);
        selectRow.classList.add('edit-select-row');
        selectProject.textContent = 'Change to:';
        selectRow.appendChild(selectProject);
        selectRow.appendChild(selectBox);
        const btnContainer = document.querySelector('.edit-btn-container');
        editForm.insertBefore(selectRow, btnContainer);
    }
}