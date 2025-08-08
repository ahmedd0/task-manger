import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaskService } from '../task';
import { Btn } from '../../../../shared/directives/btn';

@Component({
  selector: 'app-add-task',
  imports: [Btn],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  @ViewChild('addTask') addTask!: ElementRef;
  constructor(private taskService: TaskService) {}
  async toggleAddTask() {
    // Add exit animation before closing
    if (this.addTask?.nativeElement) {
      this.addTask.nativeElement.classList.remove(
        'translate-y-0',
        'opacity-100'
      );
      this.addTask.nativeElement.classList.add(
        // 'translate-y-[100%]',
        'opacity-0'
      );

      // Wait for animation to complete before updating service
      // await new Promise((resolve) => setTimeout(resolve, 200))// Match the duration in CSS
      this.taskService.isAddTask.update((prev) => !prev);
    } else {
      this.taskService.isAddTask.update((prev) => !prev);
    }
  }
  ngOnInit() {}
  ngAfterViewInit() {
    // Add a small delay to ensure the element is rendered
    setTimeout(() => {
      this.addTask.nativeElement.classList.remove(
        'translate-y-[100%]',
        'opacity-0'
      );
      this.addTask.nativeElement.classList.add('translate-y-0', 'opacity-100');
    }, 10);
  }
  ngOnDestroy() {
    // Cleanup if needed
  }
}
