import { Component, OnInit } from '@angular/core';
import { TaskService } from '../tasks.service';
import { Task } from '../task';

import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasks: Task[];
  done: boolean;
  editing: boolean = false;

  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private taskService: TaskService
    ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }

  add(content: string): void {
    content = content.trim();
    if (!content) { return; }
    this.taskService.addTask({ content } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
    this.ngFlashMessageService.showFlashMessage({
      messages: ["Task was added"],
      dismissible: true, 
      timeout: false
    });
  }
  
  update(task: Task): void {
    this.taskService.updateTask(task).subscribe();
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task).subscribe();
    this.ngFlashMessageService.showFlashMessage({
      messages: ["Task was deleted"],
      dismissible: true, 
      timeout: false,
      type: 'danger'
    });
  }

  edit(task: Task): void{
    task.editing = !task.editing;
  }

}
