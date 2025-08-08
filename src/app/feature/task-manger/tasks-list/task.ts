import { Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  isAddTask = signal(false);
  tasks: Task[] = [
    {
      id: 1,
      name: 'Task 1',
      userId: 1,
      description: 'Task 1 description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
      priority: 'low',
    },
    {
      id: 2,
      name: 'Task 2',
      userId: 2,
      description: 'Task 2 description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
      priority: 'low',
    },
    {
      id: 3,
      name: 'Task 3',
      userId: 3,
      description: 'Task 3 description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
      priority: 'low',
    },
    {
      id: 4,
      name: 'Task 4',
      userId: 4,
      description: 'Task 4 description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
      priority: 'low',
    },
    {
      id: 5,
      name: 'Task 5',
      userId: 1,
      description: 'Task 5 description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
      priority: 'low',
    },
    {
      id: 6,
      name: 'Task 6',
      userId: 2,
      description: 'Task 6 description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
      priority: 'low',
    },
    {
      id: 7,
      name: 'Task 7',
      userId: 3,
      description: 'Task 7 description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
      priority: 'low',
    },
    {
      id: 8,
      name: 'Task 8',
      userId: 4,
      description: 'Task 8 description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
      priority: 'low',
    },
  ];
  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }
}
