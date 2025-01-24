import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffExamsComponent } from './staff-exams.component';

describe('StaffExamsComponent', () => {
  let component: StaffExamsComponent;
  let fixture: ComponentFixture<StaffExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffExamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
