import { Component } from '@angular/core';

@Component({
  selector: 'app-commandant',
  templateUrl: './commandant.component.html',
  styleUrl: './commandant.component.scss'
})
export class CommandantComponent {


  commandants = [
    {
      name: "The commandant’s name",
      tenure: "2022 - present",
      image: "assets/uploads/slider/DSC_0543_filtered_1721217402.jpg",
      description: "The Defence Intelligence College (DIC) hitherto known as the Defence Intelligence School (DIS) was established in 2001. At inception it was located at a temporary site within the Headquarters of the Defence Intelligence Agency (DIA) in Bonny Camp Lagos. However, due to the need for a large space and conducive environment, the school was relocated to its present location in Karu a suburb of Federal Capital Territory Abuja in October 2005. "
    },
    {
      name: "The commandant’s name",
      tenure: "2020 - 2022",
      image: "assets/commandant.jpeg",
      description: "The Defence Intelligence College (DIC) hitherto known as the Defence Intelligence School (DIS) was established in 2001. At inception it was located at a temporary site within the Headquarters of the Defence Intelligence Agency (DIA) in Bonny Camp Lagos. However, due to the need for a large space and conducive environment, the school was relocated to its present location in Karu a suburb of Federal Capital Territory Abuja in October 2005. "
    },
    {
      name: "The commandant’s name",
      tenure: "2018 - 2020",
      image: "assets/commandant.jpeg",
      description: "The Defence Intelligence College (DIC) hitherto known as the Defence Intelligence School (DIS) was established in 2001. At inception it was located at a temporary site within the Headquarters of the Defence Intelligence Agency (DIA) in Bonny Camp Lagos. However, due to the need for a large space and conducive environment, the school was relocated to its present location in Karu a suburb of Federal Capital Territory Abuja in October 2005. "
    },
    {
      name: "The commandant’s name",
      tenure: "2016 - 2018",
      image: "assets/uploads/slider/DSC_0543_filtered_1721217402.jpg",
      description: "The Defence Intelligence College (DIC) hitherto known as the Defence Intelligence School (DIS) was established in 2001. At inception it was located at a temporary site within the Headquarters of the Defence Intelligence Agency (DIA) in Bonny Camp Lagos. However, due to the need for a large space and conducive environment, the school was relocated to its present location in Karu a suburb of Federal Capital Territory Abuja in October 2005. "
    }
  ];
}


