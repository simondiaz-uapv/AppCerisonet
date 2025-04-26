import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'https://pedago.univ-avignon.fr:3227/getMessages'; 
  private apiUrlLike = 'https://pedago.univ-avignon.fr:3227/likeMessage';

  private currentMessageSubject = new BehaviorSubject<any>(null);
  currentMessage$ = this.currentMessageSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Charge un message dans le sujet observable */
  setCurrentMessage(message: any): void {
    this.currentMessageSubject.next({ ...message }); // on clone
  }

  /** Update local du compteur de likes */
  updateLikes(isLiked: boolean): void {
    const msg = this.currentMessageSubject.getValue();
    if (!msg) return;
    const updated = { ...msg, likes: msg.likes + (isLiked ? 1 : -1) };
    this.currentMessageSubject.next(updated);
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  like(messageId: string, sessionId: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrlLike, { messageId, sessionId });
  }
}
