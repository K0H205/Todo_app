import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task';
import { Observable, of } from 'rxjs';
  
@Injectable({providedIn: 'root'})
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient){}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
  }

}
