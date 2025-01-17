import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private router:Router){}

  routeBlank(page:string){
    window.open(page);
  }

  route(page:string){
    this.router.navigate([page]);
  }

  isPlaying = false;
  currentTime = 0;
  duration = 0;
  videoElement!: HTMLVideoElement;

  @ViewChild('videoPlayer') set player(element: ElementRef) {
    if (element) {
      this.videoElement = element.nativeElement;
      this.setupVideoEvents();
    }
  }

  setupVideoEvents() {
    this.videoElement.addEventListener('timeupdate', () => {
      this.currentTime = this.videoElement.currentTime;
    });

    this.videoElement.addEventListener('loadedmetadata', () => {
      this.duration = this.videoElement.duration;
    });

    this.videoElement.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }

  toggleVideo() {
    if (this.videoElement.paused) {
      this.videoElement.play();
      this.isPlaying = true;
    } else {
      this.videoElement.pause();
      this.isPlaying = false;
    }
  }

  seek(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    this.videoElement.currentTime = percentage * this.duration;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }



}
