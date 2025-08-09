import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskHeader } from './add-task-header';

describe('AddTaskHeader', () => {
  let component: AddTaskHeader;
  let fixture: ComponentFixture<AddTaskHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
