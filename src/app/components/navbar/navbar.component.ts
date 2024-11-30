import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}

  toggleBackground(event: any): void {
    const isChecked = event.target.checked;
    const backgroundImage = event.target.checked
      ? 'url("https://i.postimg.cc/ZY1w5wsR/fundoescuro.png")' 
      : 'url("https://i.postimg.cc/KY6X11Cm/fundo.png")'; 

    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = 'cover';
    document.body.style.transition = 'background-image 0.5s ease-in-out';

    const cards = document.querySelectorAll('.cards'); 
    cards.forEach((card) => {
      (card as HTMLElement).style.backgroundColor = isChecked ? '#FAF3D9' : '#162B38';
    });

    const textcards1 = document.querySelectorAll('.textSpan'); 
    textcards1.forEach((textcards1) => {
      (textcards1 as HTMLElement).style.color = isChecked ? '#000' : '#fff'; 
    });
    
    const titlecards = document.querySelectorAll('.titleCard'); 
    titlecards.forEach((titlecards) => {
      (titlecards as HTMLElement).style.color = isChecked ? '#fff' : '#000';
    });

    const likes = document.querySelectorAll('.buttonLikes'); 
    likes.forEach((likes) => {
      (likes as HTMLElement).style.backgroundColor = isChecked ? '#EAE0BA' : '#162B38';
      (likes as HTMLElement).style.color = isChecked ? '#000' : '#fff';
    });

    if (isChecked) {
      document.querySelector('.navbar')?.setAttribute('style', 'background-color: #EAE0BA;');
      document.querySelector('.buttonVoltar')?.setAttribute('style', 'background-color: #EAE0BA; color:#162B38');
      document.querySelector('.textosVideo')?.setAttribute('style', 'color: #fff');
      document.querySelector('h1')?.setAttribute('style', 'color: #fff');
      document.querySelector('p')?.setAttribute('style', 'color: #fff');
      document.querySelector('h2')?.setAttribute('style', 'color: #fff');
      document.querySelector('.temaTexto')?.setAttribute('style', 'color: #000');
      document.querySelector('.titleCard')?.setAttribute('style', 'color: #fff');
    } else {
      document.querySelector('.navbar')?.setAttribute('style', 'background-color: #FAFAFA;');
      document.querySelector('.buttonVoltar')?.setAttribute('style', 'background-color: #162B38; color:#EAE0BA');
      document.querySelector('.textosVideo')?.setAttribute('style', 'color: #000');
      document.querySelector('h1')?.setAttribute('style', 'color: #000');
      document.querySelector('p')?.setAttribute('style', 'color: #000');
      document.querySelector('h2')?.setAttribute('style', 'color: #000');
      document.querySelector('.temaTexto')?.setAttribute('style', 'color: #000');
      document.querySelector('.titleCard')?.setAttribute('style', 'color: #000');
    }
}
}