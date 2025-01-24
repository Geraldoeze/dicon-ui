import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCAComponent } from './staff-c-a.component';

describe('StaffCAComponent', () => {
  let component: StaffCAComponent;
  let fixture: ComponentFixture<StaffCAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffCAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
