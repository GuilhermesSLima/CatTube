import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoComponent } from '../video/video.component';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent,CommonModule,AsyncPipe, VideoComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  constructor(public auth: AuthService, private router: Router) {}

  navigateToPage() {
    this.router.navigate(['/video']); 
  }


  showVideo = false;
  currentVideo: string = '';

  showVideoContent(videoId: string) {
    this.currentVideo = videoId;
    this.showVideo = true;
  }
}