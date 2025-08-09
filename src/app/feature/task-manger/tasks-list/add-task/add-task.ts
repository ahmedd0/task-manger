import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../task';
import { Btn } from '../../../../shared/directives/btn';
import { Input } from '../../../../shared/directives/input';
import {
  UiSelectComponent,
  SelectOption,
} from '../../../../shared/components/select/select';

@Component({
  selector: 'app-add-task',
  imports: [Btn, Input, UiSelectComponent, ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  @ViewChild('addTask') addTask!: ElementRef;
  form!: FormGroup;
  private fb = new FormBuilder();
  constructor(private taskService: TaskService) {}
  statusOptions: SelectOption[] = [
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'On Hold', value: 'on-hold' },
    { label: 'Deferred', value: 'deferred' },
    { label: 'Blocked', value: 'blocked' },
    { label: 'Archived', value: 'archived' },
    { label: 'Deleted', value: 'deleted' },
  
  ];
  priorityOptions: SelectOption[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];
  status: string | null = null;
  priority: string | null = null;
  async toggleAddTask() {
    // Add exit animation before closing
    if (this.addTask?.nativeElement) {
      this.addTask.nativeElement.classList.remove('translate-y-0');
      this.addTask.nativeElement.classList.add('translate-y-[100%]');

      // Wait for animation to complete before updating service
      // await new Promise((resolve) => setTimeout(resolve, 200))// Match the duration in CSS
      this.taskService.isAddTask.update((prev) => !prev);
    } else {
      this.taskService.isAddTask.update((prev) => !prev);
    }
  }
  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      status: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      dueDate: [null],
    });
  }
  ngAfterViewInit() {
    // Add a small delay to ensure the element is rendered
    setTimeout(() => {
      this.addTask.nativeElement.classList.remove('translate-y-[100%]');
      this.addTask.nativeElement.classList.add('translate-y-0');
    }, 10);
  }
  ngOnDestroy() {
    // Cleanup if needed
  }
  onSubmit() {
    console.log(this.form.value);
  }
}
