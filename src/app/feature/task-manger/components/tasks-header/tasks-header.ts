import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tasks-header',
  standalone: true,
  imports: [],
  templateUrl: './tasks-header.html',
  styleUrl: './tasks-header.scss',
})
export class TasksHeader {
  bgColor = input<string>('white');
  title = input<string>('No Title');
  description = input<string>('No Description');
}
