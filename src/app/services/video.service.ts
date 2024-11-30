import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:3000/videos';  // URL da sua API

  constructor(private http: HttpClient) {}

  // Obter dados do vídeo pelo ID
  getVideo(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }

  // Incrementar visualizações de um vídeo
  incrementView(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`).pipe(
      switchMap(videos => {
        const video = videos[0];  // Assume que o vídeo será único

        // Atualiza a contagem de visualizações
        video.views += 1;

        // Atualiza o vídeo no json-server
        return this.http.put<any>(`${this.apiUrl}/${video.id}`, video);
      })
    );
  }

  incrementLike(id: string, increment: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`).pipe(
      switchMap(videos => {
        const video = videos[0];
        video.likes += increment; // Incrementa ou decrementa com base no parâmetro
        return this.http.put<any>(`${this.apiUrl}/${video.id}`, video);
      })
    );
  }
  
  incrementDislike(id: string, increment: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`).pipe(
      switchMap(videos => {
        const video = videos[0];
        video.dislikes += increment; // Incrementa ou decrementa com base no parâmetro
        return this.http.put<any>(`${this.apiUrl}/${video.id}`, video);
      })
    );
  }

  // Método para filtrar vídeos com base no título
  searchVideosByTitle(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?title_like=${query}`).pipe(
      // O 'title_like' filtra os vídeos que contêm a string em qualquer parte do título
    );
  }
}
