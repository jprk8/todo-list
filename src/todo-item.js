export { Todo };

class Todo {
  constructor(title, notes, dueDate, priority = 1) {
    // omitting priority will set to priority 1 (normal)
    // reserve priority 0 for urgent todo
    this.title = title;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }

  toggleComplete() {
    this.complete ? (this.complete = false) : (this.complete = true);
  }
}
