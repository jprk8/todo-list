import './style.css';
import { Todo } from './todo-item.js';
import { Project } from './project.js';

const test = new Todo('test', 'testing testing');
const myProject = new Project('My Project');
myProject.addTodo(test);
myProject.listTodo();