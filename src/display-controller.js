// Module to control the DOM/Display
import { format } from 'date-fns';
export { showTitle, showProjectList }

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
    for (const todo of project) {
        const todoCard = document.createElement('div');
        todoCard.classList.add('todo-card');
    }
}