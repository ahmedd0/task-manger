import { Component, input, signal, computed, Signal } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskComponent } from './task/task';
import { NoTasks } from './no-tasks/no-tasks';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [TaskComponent, NoTasks],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
  hostDirectives: [],
})
export class TasksList {
  tasks = input<Task[]>();
  selectedUserId = input<number | null>();
  hasSelection = computed(() => this.selectedUserId() != null);
  hasTasks = computed(() => this.filteredTasks().length > 0);

  filteredTasks: Signal<Task[]> = computed(() => {
    return (
      this.tasks()?.filter((task) => task.userId === this.selectedUserId()) ??
      []
    );
  });
}
