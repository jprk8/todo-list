import './style.css';
import { Todo } from './todo-item.js';
import { Project } from './project.js';
import { format } from 'date-fns'; // use later to format dates

const projects = [];

function showProjects() {
    for (const project of projects) {
        console.log(project.title);
        console.log(`todo items: ${project.todoArray.length}`)
    }
}

const test = new Todo('test', 'this is due today', new Date());
const test2 = new Todo('item2', 'this has no dueDate with low priority', null, 2);
const test3 = new Todo('todo3', 'this one is urgent', new Date(), 0);
const test4 = new Todo('anotherone' , 'normal todo but no dueDate');
const last = new Todo('future', 'due date is christmas (months start from 0)', new Date(2024, 11, 25));

const john = new Todo('john', 'john', new Date(2024, 1, 13));
const claire = new Todo('claire', 'claire', new Date(2024, 3, 12));
const jaden = new Todo('jaden', 'jaden', new Date(2024, 0, 24));
const caitlyn = new Todo('caitlyn', 'caitlyn', new Date(2024, 4, 15));

const myProject = new Project('My Project');
const project2 = new Project('Another Project');
myProject.addTodo(test);
myProject.addTodo(test2);
myProject.addTodo(test3);
myProject.addTodo(test4);
myProject.addTodo(last);

project2.addTodo(john);
project2.addTodo(claire);
project2.addTodo(jaden);
project2.addTodo(caitlyn);


projects.push(myProject);
projects.push(project2);
showProjects();

//myProject.listTodo();
//myProject.sortByPriority();
//myProject.listTodo();
//myProject.delTodo(2);
//myProject.listTodo();

project2.listTodo();
project2.sortByDueDate();
project2.listTodo();