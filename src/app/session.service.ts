import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//Service qui intéragit avec le serveur pour savoir si la session existe dans MongoDB
export class SessionService {
  idSession = document.cookie.split(';').find(c => c.trim().startsWith('idSession='))?.split('=')[1];
  private apiUrlSession = 'https://pedago.univ-avignon.fr:3227';
  private sessionActiveSubject = new BehaviorSubject<boolean>(false); // Subject pour savoir si la session est active
  sessionActive$ = this.sessionActiveSubject.asObservable(); // Observable pour savoir si la session est active
  constructor(private http: HttpClient) {
    this.checkSessionActive();
  }

  /**
   * Fonction qui vérifie si la session est active
   * Si oui elle met à jour le subject sessionActiveSubject
   * et les cookies nom et prenom
   */
  checkSessionActive() {
    const idSession = this.idSession;
    if (idSession) {
      this.isSessionActiveBackend(idSession).subscribe(
        response => {
          this.sessionActiveSubject.next(response.isActive);
          document.cookie = `nom=${response.nom};`;
          document.cookie = `prenom=${response.prenom};`;
        },
        error => {
          this.sessionActiveSubject.next(false);
        }
      );
    } else {
      this.sessionActiveSubject.next(false);
    }
  }
  
  private isSessionActiveBackend(idSession: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlSession}/checkSession?idSession=${idSession}`);
  }

  setSessionActive(isActive: boolean) {
    this.sessionActiveSubject.next(isActive);
  }
}