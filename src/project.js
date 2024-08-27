export { Project };

class Project {
    constructor(title) {
        this.title = title;
        this.todoArray = [];
    }

    addTodo(item) {
        this.todoArray.push(item);
    }

    delTodo(index) {
        this.todoArray.splice(index, 1);
    }

    listTodo() {
        // sort by duedate and priority by default?
        // don't worry about it here
        console.log(`Project Name: ${this.title}`);
        console.table(this.todoArray);
    }

    sortByPriority() {
        this.todoArray.sort((a, b) => a.priority - b.priority);
    }

    sortByDueDate() {
        this.todoArray.sort((a, b) => a.dueDate - b.dueDate);
    }
}
