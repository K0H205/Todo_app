import { Component, OnInit } from '@angular/core';
import { TaskService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }
  getTasks(): void {
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }
}
