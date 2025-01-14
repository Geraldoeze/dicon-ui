import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-programes',
  templateUrl: './pg-programes.component.html',
  styleUrl: './pg-programes.component.scss'
})
export class PgProgramesComponent {

  constructor(private router: Router){}

  departments = [
    { 
      name: 'Department of Sociology/Anthropology M.Sc. and PhD', 
      courses: { 
        course1: 'Criminology, Conflict and Change'
      }, 
      requirements: '<p>The criteria for admission into the PGD programme will be as follows: </p> <p>Matriculation requirement of the University, which is five (5) O-level Credit passes including English Language with either of the following:</p><p>1. A student with at least 3rd class degree in any area of study.</p><p>2. HND holders with a minimum of Upper Credit from recognized institution may also be considered.</p><p>3. BSc holders with pass degree with 5 years and above post-graduation experience.</p>' 
    },
    { 
      name: 'Department of Geography and Environmental Sustainability M.Sc. and PhD', 
      courses: {
        course1: 'Catography',
        course2: 'Remote Sensing',
        course3: 'Geographic Information System'
      }, 
      requirements: '<p>Candidates applying for the M.Sc. degree in Geography should hold Bachelors degree with a minimum CGPA of 3.0 on a scale of 5.0 in Geography, Education/Geography or related disciplines in the Social, Physical, Biological, Agricultural and Environmental Sciences or Engineering etc. While candidates applying for the PhD degree in Geography and Environmental Sustainability, Cartography and Remote Sensing should hold Master’s degree with a minimum CGPA of at least 3.5 on a scale of 5.0 in a relevant area of Geography or the related disciplines.</p>' 
    },
    { 
      name: 'Department of Political Science PGD, M.Sc. and PhD', 
      courses: {
        course1: 'International Relations',
        course2: 'Conflict, Peace and Strategic Studies',
        course3: 'Human Security and Counter Terrorism',
        course4: 'Soft Protocol and Diplomacy',
      }, 
      requirements: '<p>The basic entry qualification for admission into the M.Sc. programme is a Bachelor’s Degree with at least a Second-Class Lower Division with not less than 3.00 GPA or its equivalent. Also, candidates with appropriate Postgraduate Diploma of the University of Nigeria or of other recognized Universities with at least 3.50 GPA on a 5-point scale. In addition, the candidate must satisfy the Departmental O’Level and/or Direct Entry general entry requirements for degree programmes. </p> <p> The basic entry qualification for admission into the PGD is HND in any academic field. M.Sc. programme is a Bachelor’s Degree with at least a Second-Class Lower Division with not less than 3.00 GPA or its equivalent in Social, Management Science or other related fields. Also, candidates with appropriate Postgraduate Diploma of the University of Nigeria or of other recognised Universities with at least 3.50 GPA on a 5-point scale. In addition, the candidate must satisfy the Departmental O’Level and/or Direct Entry general entry requirements for degree programmes. While the basic entry qualification for admission into the PhD programme is a Master\'s Degree in relevant areas from the University of Nigeria or other recognised universities with at least 3.50 CGPA on a 5-point scale. In addition, the candidate must satisfy the Departmental O\'Level and /or Direct Entry general entry requirements for degree programmes.</p>'
    },
    { 
      name: 'Institute of Social Policy PGD, MSP, M.Sc. and PhD', 
      courses: {
        course1: 'Social Policy',
      }, 
      requirements: '<p>The criteria for admission into M.Sc. Social Policy programme will be as follows:</p><p>1. Five (5) O-level credits passes including English;</p><p>2. Candidates with at least 2nd Class honours Lower Division in Social or Management Science;</p><p>3. Candidates with a PGD in Social Policy with a CGPA of 3.5 on a 5-point scale or its equivalent.</p> <p>While Basic Admission Requirements for Ph.D programme and MSc/Ph.D Programme is:</p><p>1. Candidates for PhD programme must have academic Master’s degree in Social Policy with a minimum CGPA of 3.0/4.0 or 3.5/5.0 and Project score not lower than 60%</p><p>2. Candidates for PhD programme with the required CGPA of 3.0/4.0 or 3.5/5.0 and Project score not lower than 60% but without Master’s degree in Social Policy will be admitted for M.Sc./PhD. The candidate will take relevant M.Sc. courses in Social Policy for one session before seeking for firm registration for Ph.D programme.</p><p>3. Candidates must demonstrate adequate intellectual capacity, maturity and effective decision making and problem solving potentials.</p><p>4. In addition to the above, the Candidates must have made at least 2nd class honours lower division with a CPGA of not lower than 2.5 plus the basic requirements in WASC/GCE O’Level for the first degree.</p>'
    },
    { 
      name: 'Department of Psychology M.Sc. and PhD', 
      courses: {
        course1: 'Criminal Psychology and Forensic Studies',
      }, 
      requirements: '<p>The basic entry qualification for admission into the PGD is HND in any academic field.The entry qualification for admission into the M.Sc. programme is a Bachelor’s Degree with at least a Second-Class Lower Division with not less than 3.00 GPA or its equivalent in Psychology or other related fields in Criminal and Forensic Science. Also, candidates with appropriate Postgraduate Diploma of the University of Nigeria or of other recognised Universities with at least 3.50 GPA on a 5-point scale. </p> <p>While the basic entry qualification for admission into the PhD programme is a Master\'s Degree in relevant areas from the University of Nigeria or other recognised universities with at least 3.50 CGPA on a 5-point scale.</p>' 
    },
    { 
      name: 'Department of Public Administration M.Sc and PhD', 
      courses: {
        course1: 'Strategic Intelligence and Security Management',
      }, 
      requirements: '<p>The basic entry qualification for admission into the PGD is HND in any academic field.The criteria for admission into M.Sc. Strategic Intelligence programme will be as follows:</p><p>1. Five (5) O-level credits passes including English;</p><p>Candidates with at least 2nd Class honours Lower Division in Social or Management Science or other related fields.</p><p>2. Candidates with a PGD in Social Policy with a CGPA of 3.5 on a 5 point scale or its equivalent.</p>'
      
    }
  ];

  route(page:string){
    this.router.navigate([page]);
  }
 
}
