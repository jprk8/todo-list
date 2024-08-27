import { Todo } from './todo-item.js';
export { Project };

class Project {
    constructor(title) {
        this.title = title;
        this.todoArray = [];
    }

    addTodo(item) {
        this.todoArray.push(item);
    }

    listTodo() {
        console.log(`Project Name: ${this.title}`);
        console.table(this.todoArray);
    }
}
