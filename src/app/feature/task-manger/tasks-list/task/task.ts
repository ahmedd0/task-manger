import { Component, input } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class TaskComponent {
  task = input<Task>();
}
