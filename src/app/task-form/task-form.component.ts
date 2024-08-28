import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Task } from '../models/task.model';
import shortid from 'shortid';

import { TaskService } from '../services/task.service.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
    status: 'to-do',
    history: [],
  };
  @Output() taskSaved = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    if (!this.task.id) {
      this.task.id = shortid.generate();
      this.task.history.push(`Task created on ${new Date().toLocaleString()}`);
      this.taskService.addTask(this.task);
    } else {
      this.task.history.push(`Task updated on ${new Date().toLocaleString()}`);
      this.taskService.updateTask(this.task);
    }
    this.taskSaved.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.task = {
      id: '',
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      status: 'to-do',
      history: [],
    };
  }
}
