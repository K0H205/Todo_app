import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  
@Injectable({providedIn: 'root'})
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient){}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
  }

  addTask (task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, httpOptions)
  }

  deleteTask (task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url, httpOptions)
  }
}
