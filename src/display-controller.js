// Module to control the DOM/Display
import { format } from 'date-fns';
export { showTitle, showProjectList, showHome, refreshMain, refreshProjectList }

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
        for (const todo of project.todoArray) {
            if (todo) {
                const todoTab = document.createElement('div');
                todoTab.classList.add('todo-tab');
                
                // completeBtn will delete the item
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
                });

                // make edit button
                const editBtn = document.createElement('button');
                editBtn.classList.add('edit-btn');
                editBtn.textContent = 'E';
                editBtn.setAttribute('index', index);

                todoMenu.appendChild(delBtn);
                todoMenu.appendChild(editBtn);

                todoCard.appendChild(todoTab);
                todoCard.appendChild(todoMain);
                todoCard.appendChild(todoMenu);
                container.appendChild(todoCard);

                index++;
            }
        }
    }
}

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
