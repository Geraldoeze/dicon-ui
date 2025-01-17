import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-staff-general-info',
  templateUrl: './staff-general-info.component.html',
  styleUrl: './staff-general-info.component.scss'
})
export class StaffGeneralInfoComponent {
  @Input() profileData:any;
}
