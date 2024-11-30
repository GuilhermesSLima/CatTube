import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VideoComponent implements OnInit {
  @Input() videoId!: string;
  @Output() backToHome = new EventEmitter<void>(); // EventEmitter para 'backToHome'
  videoUrl!: SafeResourceUrl; // URL do vídeo sanitizada
  views: number = 0;
  likes: number = 0;
  dislikes: number = 0;
  videoTitle: string = ''; // Título do vídeo atual
  videoDescription: string = ''; // Descrição do vídeo atual
  videouploadDate: string = ''; // Descrição do vídeo atual
  hasInteracted: boolean = false; // Rastrea se o usuário já deu like/dislike
  currentInteraction: 'like' | 'dislike' | null = null; // Rastreia o tipo de interação atual

  // Lista de outros vídeos (com dados fictícios)
  otherVideos = [
    {
      id: 'WzwPy8qLTKQ',
      title: 'Acenda o Farol - Tim Maia',
      thumbnail: 'https://img.youtube.com/vi/WzwPy8qLTKQ/0.jpg'
    },
    {
      id: 'Fc9e27PFIlo',
      title: 'João e Maria - Chico Buarque',
      thumbnail: 'https://img.youtube.com/vi/Fc9e27PFIlo/0.jpg'
    },
    {
      id: 'v9jJGXgxNP4',
      title: 'Girassol - Ivyson',
      thumbnail: 'https://img.youtube.com/vi/v9jJGXgxNP4/0.jpg'
    }
  ];

  constructor(
    private videoService: VideoService,
    private router: Router,
    private sanitizer: DomSanitizer // Injete o DomSanitizer para segurança das URLs
  ) {}

  ngOnInit() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId}`
    ); // Inicializa o vídeo
    this.incrementViewCount();
  }

  incrementViewCount() {
    this.videoService.getVideo(this.videoId).subscribe(videos => {
      const video = videos[0]; // Assume que o vídeo será único
      this.views = video.views;
      this.likes = video.likes;
      this.dislikes = video.dislikes;
      this.videoTitle = video.title; // Armazena o título
      this.videoDescription = video.description; // Atualiza a descrição
      this.videouploadDate = video.uploadDate; // Atualiza a descrição

    });
  }

  // Método de voltar à página anterior
  goBack() {
    this.backToHome.emit();
  }

  // Método para atualizar o vídeo quando um novo vídeo for clicado na lista
  onVideoClick(video: any) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video.id}`
    );
    this.videoId = video.id; // Atualize o id do vídeo atual
    this.incrementViewCount(); // Atualiza as informações do vídeo
  }

  likeVideo() {
    if (!this.hasInteracted || this.currentInteraction === 'dislike') {
      this.videoService.incrementLike(this.videoId).subscribe(video => {
        this.likes = video.likes; // Atualiza o contador de likes

        if (this.currentInteraction === 'dislike') {
          this.dislikes -= 1; // Reduz o dislike se estava marcado
          this.videoService.incrementDislike(this.videoId, -1).subscribe(); // Decrementa no servidor
        }

        this.hasInteracted = true; // Marca que o usuário interagiu
        this.currentInteraction = 'like'; // Define a interação como 'like'
      });
    }
  }

  dislikeVideo() {
    if (!this.hasInteracted || this.currentInteraction === 'like') {
      this.videoService.incrementDislike(this.videoId).subscribe(video => {
        this.dislikes = video.dislikes; // Atualiza o contador de dislikes

        if (this.currentInteraction === 'like') {
          this.likes -= 1; // Reduz o like se estava marcado
          this.videoService.incrementLike(this.videoId, -1).subscribe(); // Decrementa no servidor
        }

        this.hasInteracted = true; // Marca que o usuário interagiu
        this.currentInteraction = 'dislike'; // Define a interação como 'dislike'
      });
    }
  }
}
