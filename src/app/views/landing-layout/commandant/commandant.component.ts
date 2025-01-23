import { Component } from '@angular/core';

@Component({
  selector: 'app-commandant',
  templateUrl: './commandant.component.html',
  styleUrl: './commandant.component.scss',
})
export class CommandantComponent {
  commandants = [
    { image: '/3-7.jpg', },
    { image: '/7-9.jpg', },
    { image: '/9-10.jpg', },
    { image: '/10-12.jpg',},
    { image: '/12-13.jpg',},
    { image: '/13-15.jpg',},
    { image: '/15-16.jpg',},
    { image: '/16-18.jpg' },
    { image: '/18-20.jpg' },
    { image: '/20-22.jpg' },
    { image: '/22.jpg'    },
    { image: '/22-24.jpg' },

  ];
}
