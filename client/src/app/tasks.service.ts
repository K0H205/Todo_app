import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from './task';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class TaskService {

  //Rails APIServer URI
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient){}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
  }

  addTask (task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, httpOptions)
  }

  updateTask (task: Task): Observable<Task> {
    task.done = !task.done;
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;
    return this.http.put<Task>(url, task, httpOptions)
  }

  deleteTask (task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url, httpOptions)
  }
}
