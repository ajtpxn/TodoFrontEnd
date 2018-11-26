import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  title = 'My Task List';

  newTodo = new Todo();

  selected = null;

  editing = null;

  view = 'home';

  todos = [];

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.todoService.index().subscribe(
      data => {
        this.todos = data;
      },
      err => console.error('reload() got an error: ' + err)
    );
  }

  getNumberOfTodos() {
    return this.todos.length;
  }

  populateSelected(item) {
    this.selected = item;
    this.view = 'selected';
    this.unPopulateEditing();
  }

  displayTable() {
    this.selected = null;
    this.editing = null;
    this.view = 'home';
    this.reload();
  }

  addTask() {
    const task = new Todo();
    this.todoService.create(this.newTodo).subscribe(
      data => {
        this.displayTable();
      },
      err => console.error('addTask() got an error: ' + err)
    );
  }

  setEditingTodo(item) {
    this.editing = item;
    this.view = 'editor';
  }

  unPopulateEditing() {
    this.editing = null;
    this.view = 'selected';
  }

  updateCompleted(item) {
    this.editing = item;
    this.saveChangesToTask(item.id);
  }

  saveChangesToTask(id) {
    this.todoService.update(this.editing, id).subscribe(
      data => {
        this.displayTable();
      },
      err => console.error('saveChangesToTask() got an error: ' + err)
    );
  }

  deleteTodo(id) {
    this.todoService.destroy(id).subscribe(
      data => {
        this.displayTable();
      },
      err => console.error('deleteTodo() got an error: ' + err)
    );
  }

  showAdd() {
    this.view = 'add';
  }
}
