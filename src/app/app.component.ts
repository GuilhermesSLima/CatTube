import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService, User} from '@auth0/auth0-angular';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainPageComponent } from './components/main-page/main-page.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,RouterLink,CommonModule,NavbarComponent,MainPageComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Projeto de compras';
  profile?:User| undefined |null ;
}
