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

  setTodoComplete(index) {
    this.todoArray[index].complete = true;
  }

  sortByPriority() {
    this.todoArray.sort((a, b) => a.priority - b.priority);
  }

  sortByDueDate() {
    this.todoArray.sort((a, b) => a.dueDate - b.dueDate);
  }
}
