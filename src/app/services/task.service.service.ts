import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly TASK_KEY = 'tasks';

  constructor() {}

  
  getTasks(): Task[] {
    try {
      const tasks = localStorage.getItem(this.TASK_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Failed to parse tasks from local storage', error);
      return [];
    }
  }

  
  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(this.TASK_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to local storage', error);
    }
  }

  
  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }


  updateTask(updatedTask: Task): void {
    let tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      this.saveTasks(tasks);
    } else {
      console.warn(`Task with ID ${updatedTask.id} not found`);
    }
  }

  
  deleteTask(taskId: string): void {
    let tasks = this.getTasks();
    tasks = tasks.filter((task) => task.id !== taskId);
    this.saveTasks(tasks);
  }

  
  getTaskById(taskId: string): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find((task) => task.id === taskId);
  }
}
