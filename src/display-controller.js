// Module to control the DOM/Display
import { format } from 'date-fns';
export { showTitle, showProjectList, showProject }

function showTitle(project) {
    const title = document.querySelector('.main-title');
    title.textContent = project.title;
}

function showProjectList(projects) {
    const projectList = document.querySelector('.project-list');
    for (const project of projects) {
        const listItem = document.createElement('li');
        listItem.textContent = `# ${project.title}`;
        projectList.appendChild(listItem);
    }
}

// Show all Todos of a project in main-container
function showProject(project) {
    const container = document.querySelector('.main-container');
    for (const todo of project.todoArray) {
        const todoCard = document.createElement('div');
        todoCard.classList.add('todo-card');

        const todoTab = document.createElement('div');
        todoTab.classList.add('todo-tab');
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete');
        todoTab.appendChild(completeBtn);
        todoCard.appendChild(todoTab);

        const todoTitle = document.createElement('div');
        todoTitle.classList.add('todo-title');
        todoTitle.textContent = todo.title;
        const todoNotes = document.createElement('div');
        todoNotes.classList.add('todo-notes');
        todoNotes.textContent = todo.notes;
        const todoDate = document.createElement('div');
        todoDate.classList.add('todo-date');
        const shortDate = format(todo.dueDate, 'MMM d, y');
        todoDate.textContent = `Due Date: ${shortDate}`;

        const todoMain = document.createElement('div');
        todoMain.classList.add('todo-main');
        todoMain.appendChild(todoTitle);
        todoMain.appendChild(todoNotes);
        todoMain.appendChild(todoDate);
        todoCard.appendChild(todoMain);
        container.appendChild(todoCard);
    }
}