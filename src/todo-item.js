export { Todo };
import { format } from 'date-fns';

class Todo {
    constructor(title, notes, dueDate = new Date(), priority = 1) {
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
}

