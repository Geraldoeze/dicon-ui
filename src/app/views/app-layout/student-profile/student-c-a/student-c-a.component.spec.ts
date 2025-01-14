import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCAComponent } from './student-c-a.component';

describe('StudentCAComponent', () => {
  let component: StudentCAComponent;
  let fixture: ComponentFixture<StudentCAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentCAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
