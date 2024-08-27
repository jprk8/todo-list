export { Todo };

class Todo {
    constructor(title, notes, dueDate, priority = 1) {
        // omitting priroity will set to priority 1 (normal)
        // reserve priority 0 for urgent todo
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
}

