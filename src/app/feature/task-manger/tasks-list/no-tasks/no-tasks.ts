import { Component } from '@angular/core';
import { Btn } from '../../../../shared/directives/btn';
import { TaskService } from '../task';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-no-tasks',
  imports: [Btn],
  templateUrl: './no-tasks.html',
  styleUrl: './no-tasks.scss',
})
export class NoTasks {
  constructor(private taskService: TaskService) {}
  toggleAddTask() {
    this.taskService.isAddTask.update((prev) => !prev);
  }
}
