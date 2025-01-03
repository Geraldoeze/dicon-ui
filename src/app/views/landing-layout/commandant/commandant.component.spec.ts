import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandantComponent } from './commandant.component';

describe('CommandantComponent', () => {
  let component: CommandantComponent;
  let fixture: ComponentFixture<CommandantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
