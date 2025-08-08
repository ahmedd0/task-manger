import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskManager } from './feature/task-manger/task-manager';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TaskManager],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ng-20';
  items: any[] = [1, 2, 3, 4, 5];
  bgColor: string = '#000';
  doubleItems() {
    this.items = this.items.map((item) => item * 2);
  }
  setRandomBgColor() {
    this.bgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
