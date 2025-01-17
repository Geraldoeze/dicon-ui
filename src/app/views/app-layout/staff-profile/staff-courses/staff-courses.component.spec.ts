import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCoursesComponent } from './staff-courses.component';

describe('StaffCoursesComponent', () => {
  let component: StaffCoursesComponent;
  let fixture: ComponentFixture<StaffCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
