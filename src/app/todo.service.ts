import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './models/todo';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:8484/';

  private url = this.baseUrl + 'api/todos';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  public index() {
    return this.http.get<Todo[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error listing all Todos');
      })
    );
  }

  public create(todo) {
    const task = new Todo();
    task.task = todo.task;
    task.description = todo.description;
    task.completed = false;
    const user = new User();
    user.id = 1;
    user.email = 'shaun@winchester.co.uk';
    user.username = 'shaun';
    user.password = null;
    user.enabled = true;
    user.role = null;
    task.user = user;
    task.dueDate = null;
    task.completeDate = null;
    return this.http.post<Todo>(this.url, task, this.httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error creating Todo');
      })
    );
  }

  public update(todo, id) {
    return this.http
      .put<Todo>(this.url + '/' + id, todo, this.httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error updating Todo');
        })
      );
  }

  public destroy(id) {
    return this.http.delete(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error destroying Todo');
      })
    );
  }
}
