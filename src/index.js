import './style.css';
import { Todo } from './todo-item.js';
import { Project } from './project.js';
import { showTitle, showProjectList } from './display-controller.js';

 // use later to format dates

const projects = [];

function showProjects() {
    for (const project of projects) {
        console.log(project.title);
        console.log(`todo items: ${project.todoArray.length}`)
    }
}

// testing testing testing testing testing testing testing testing testing testing testing 
const test = new Todo('test', 'this is due today', new Date());
const test2 = new Todo('item2', 'this has no dueDate with low priority', null, 2);
const test3 = new Todo('todo3', 'this one is urgent', new Date(), 0);
const test4 = new Todo('anotherone' , 'normal todo but no dueDate');
const last = new Todo('future', 'due date is christmas (months start from 0)', new Date(2024, 11, 25));

const fourth = new Todo('Fourth of July', 'Happy Fourth', new Date(2024, 6, 4));
const christmas = new Todo('Christmas', 'Merry Christmas', new Date(2024, 11, 25));
const newyear = new Todo('New Year', 'Happy New Year', new Date(2024, 0, 1));
const thanks = new Todo('Thanksgiving', 'nom nom nom nom', new Date(2024, 10, 28));

const myProject = new Project('Test Project');
const project2 = new Project('Holidays');
myProject.addTodo(test);
myProject.addTodo(test2);
myProject.addTodo(test3);
myProject.addTodo(test4);
myProject.addTodo(last);

project2.addTodo(fourth);
project2.addTodo(christmas);
project2.addTodo(newyear);
project2.addTodo(thanks);

projects.push(myProject);
projects.push(project2);
showProjects();

//myProject.listTodo();
//myProject.sortByPriority();
//myProject.listTodo();
//myProject.delTodo(2);
//myProject.listTodo();

project2.sortByDueDate();
project2.listTodo();

showTitle(project2);
showProjectList(projects);