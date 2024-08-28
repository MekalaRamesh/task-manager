import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskHistoryComponent } from '../task-history/task-history.component';

import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskHistoryComponent], 
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent  {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  editTask(task: Task): void {
    // Logic to edit task
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  changeStatus(task: Task, status: 'to-do' | 'in-progress' | 'completed'): void {
    task.status = status;
    task.history.push(`Status changed to ${status} on ${new Date().toLocaleString()}`);
    this.taskService.updateTask(task);
    this.loadTasks();
  }

  sortTasks(criteria: 'dueDate' | 'priority' | 'status'): void {
    this.tasks.sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
  }

  exportToCSV(): void {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Title,Description,Due Date,Priority,Status\n';
    this.tasks.forEach((task) => {
      csvContent += `${task.title},${task.description},${task.dueDate},${task.priority},${task.status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tasks.csv');
    document.body.appendChild(link);
    link.click();
  }
}
