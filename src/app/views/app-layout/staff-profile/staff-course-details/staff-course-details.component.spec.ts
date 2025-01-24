import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCourseDetailsComponent } from './staff-course-details.component';

describe('StaffCourseDetailsComponent', () => {
  let component: StaffCourseDetailsComponent;
  let fixture: ComponentFixture<StaffCourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffCourseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
