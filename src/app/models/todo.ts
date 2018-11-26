export class Todo {

  id: number;
  task: string;
  description: string;
  completed: boolean;
  user: {};
  dueDate: string;
  completeDate: string;

  constructor(
    id?: number,
    task?: string,
    description?: string,
    completed?: boolean,
    user?: {},
    dueDate?: string,
    completeDate?: string
    ) {
    this.id = id;
    this.task = task;
    this.description = description;
    this.completed = completed;
    this.user = user;
    this.dueDate = dueDate;
    this.completeDate = completeDate;
  }
}
