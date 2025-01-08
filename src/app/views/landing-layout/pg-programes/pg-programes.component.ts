import { Component } from '@angular/core';

@Component({
  selector: 'app-pg-programes',
  templateUrl: './pg-programes.component.html',
  styleUrl: './pg-programes.component.scss'
})
export class PgProgramesComponent {


  departments = [
    { name: 'Department of Professional Studies', isOpen: false },
    { name: 'Department of Counter Intelligence', isOpen: false },
    { name: 'Department of Technical Studies', isOpen: false },
    { name: 'Department of General Studies', isOpen: false },
    { name: 'Joint Military Attache/Adviser Programme', isOpen: false },
    { name: 'Department of Languages', isOpen: false }
  ];

  toggle(index: number) {
    this.departments[index].isOpen = !this.departments[index].isOpen;
  }
}
