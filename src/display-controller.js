// Module to control the DOM/Display
import { format } from 'date-fns';
export { showTitle, showProjectList, showProject, showHome, refreshMain, delTodoCard }

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

        //showProject(project);
        let index = 0;
        for (const todo of project.todoArray) {
            if (todo) {
                const todoTab = document.createElement('div');
                todoTab.classList.add('todo-tab');
                
                // completeBtn will delete the item
                const completeBtn = document.createElement('button');
                completeBtn.classList.add('complete');
                // make data attritubtes to connect the buttons to DOM and project array
                completeBtn.setAttribute('index', index);
                completeBtn.setAttribute('project-index', `${project.title}${index}`);
                completeBtn.setAttribute('project-title', project.title);
        
                completeBtn.addEventListener('click', () => {
                    project.delTodo(completeBtn.getAttribute('index'));
                    const projectIndex = completeBtn.getAttribute('project-index');
                    //delTodoCard(projectIndex);
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
        
                // display urgent cards
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

                index++;
            }
        }
    }
}

// Show all Todos of a single project in main-container
function showProject(project) {
    const container = document.querySelector('.main-body');
    let index = 0;
    for (const todo of project.todoArray) {
        if (todo) {
            const todoTab = document.createElement('div');
            todoTab.classList.add('todo-tab');
            
            // completeBtn will delete the item
            const completeBtn = document.createElement('button');
            completeBtn.classList.add('complete');
            // make data attritubtes to connect the buttons to DOM and project array
            completeBtn.setAttribute('index', index);
            completeBtn.setAttribute('project-index', `${project.title}${index}`);
            completeBtn.setAttribute('project-title', project.title);
    
            completeBtn.addEventListener('click', () => {
                project.delTodo(index);
                const projectIndex = completeBtn.getAttribute('project-index');
                delTodoCard(projectIndex);
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
    
            // display urgent cards
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
    
            index++;
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

// Delete Todo card from current display
function delTodoCard(projectIndex) {
    const completeBtn = document.querySelector(`.complete[project-index='${projectIndex}']`);
    const todoCard = completeBtn.parentNode.parentNode;
    const body = document.querySelector('.main-body');
    body.removeChild(todoCard);
}