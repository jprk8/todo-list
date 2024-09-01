// Module to control the DOM/Display
import { format } from 'date-fns';
export { showTitle, showProjectList, showProject, showHome }

// Show Project lists on the sidebar
function showProjectList(projects) {
    const projectList = document.querySelector('.project-list');
    for (const project of projects) {
        const listItem = document.createElement('li');
        listItem.textContent = `# ${project.title}`;
        projectList.appendChild(listItem);
    }
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
        showProject(project);
    }
}

// Show all Todos of a single project in main-container
function showProject(project) {
    const container = document.querySelector('.main-body');
    for (const todo of project.todoArray) {
        const todoTab = document.createElement('div');
        todoTab.classList.add('todo-tab');
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete');
        todoTab.appendChild(completeBtn);

        const todoTitle = document.createElement('div');
        todoTitle.classList.add('todo-title');
        todoTitle.textContent = todo.title;
        const todoNotes = document.createElement('div');
        todoNotes.classList.add('todo-notes');
        todoNotes.textContent = todo.notes;
        const todoDate = document.createElement('div');
        todoDate.classList.add('todo-date');

        // handle items with no due date
        if (todo.dueDate) {
            const shortDate = format(todo.dueDate, 'MMM d, y');
            todoDate.textContent = `Due Date: ${shortDate}`;
        } else {
            todoDate.textContent = 'No Due Date';
        }

        const todoCard = document.createElement('div');
        const todoMain = document.createElement('div');
        // handle urgent cards
        if (todo.priority === 0) {
            todoCard.classList.add('todo-card-urgent');
            todoMain.classList.add('todo-main-urgent');
        } else {
            todoCard.classList.add('todo-card');
            todoMain.classList.add('todo-main');
        }
        todoMain.appendChild(todoTitle);
        todoMain.appendChild(todoNotes);
        todoMain.appendChild(todoDate);
        todoCard.appendChild(todoTab);
        todoCard.appendChild(todoMain);
        container.appendChild(todoCard);
    }
}