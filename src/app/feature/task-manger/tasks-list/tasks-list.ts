import {
  Component,
  input,
  signal,
  computed,
  Signal,
  output,
  inject,
} from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskComponent } from './task/task';
import { NoTasks } from './no-tasks/no-tasks';
import { NgClass } from '@angular/common';
import { Btn } from '../../../shared/directives/btn';
import { TaskService } from './task';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [TaskComponent, NoTasks, Btn],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
  hostDirectives: [],
})
export class TasksList {
  taskService = inject(TaskService);
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
  toggleAddTask() {
    this.taskService.isAddTask.update((prev) => !prev);
  }
}
