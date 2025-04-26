import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Service pour la connexion et la déconnexion intéragit avec le serveur node
export class AuthService {
  private apiUrlLogin = 'https://pedago.univ-avignon.fr:3227/login';
  private apiUrlLogout = 'https://pedago.univ-avignon.fr:3227/logout';

  constructor(private http: HttpClient) {}
  /**
   * 
   * @param login 
   * @param password 
   * @returns un objet de type Observable<any> qui contient les informations de l'utilisateur
   */
  login(login: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlLogin}?login=${login}&password=${password}`, {});
  }

  /**
   * Fonction qui déconnecte l'utilisateur
   * @param idSession 
   * @returns un objet de type Observable<any>
   */
  logout(idSession: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlLogout}?idSession=${idSession}`, {});
  }
}