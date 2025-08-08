import { Component, input, OnInit, signal } from '@angular/core';
import { TasksHeader } from './components/tasks-header/tasks-header';
import { CommonModule } from '@angular/common';
import { User } from './interfaces/user';
import { Task } from './interfaces/task';
import { UsersList } from './users-list/users-list';
import { TasksList } from './tasks-list/tasks-list';
import { AddTask } from './tasks-list/add-task/add-task';
import { UserService } from './users-list/user';
import { TaskService } from './tasks-list/task';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [TasksHeader, UsersList, TasksList, CommonModule, AddTask],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.scss',
})
export class TaskManager implements OnInit {
  users: User[] = [];
  tasks: Task[] = [];
  showAddTask = false;
  selectedUserId: number | null = null;
  constructor(
    private userService: UserService,
    public taskService: TaskService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getTasks();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      },
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        // this.tasks = [];
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      },
    });
  }
  onSelectUser(userId: number) {
    this.selectedUserId = userId;
  }
}
