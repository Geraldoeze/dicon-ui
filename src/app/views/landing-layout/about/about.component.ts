import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {


  departments = [
    { name: 'Department of Professional Studies', isOpen: open },
    { name: 'Department of Counter Intelligence', isOpen: false },
    { name: 'Department of Technical Studies', isOpen: false },
    { name: 'Department of General Studies', isOpen: false },
    { name: 'Joint Military Attache/Adviser Programme', isOpen: false },
    { name: 'Department of Languages', isOpen: false }
  ];
  courses = [
    { name: 'Generic Courses', isOpen: open },
    { name: 'Specialized Courses', isOpen: false },
    { name: 'Language Courses', isOpen: false },
    { name: 'Strategic Courses', isOpen: false },
  ];

  toggleDepartment(index: number) {
    this.departments[index].isOpen = !this.departments[index].isOpen;
  }

  toggleCourse(index: number) {
    this.courses[index].isOpen = !this.courses[index].isOpen;
  }
 

}
