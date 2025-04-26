import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-bandeau',
  standalone: true,
  imports: [
    MatIconModule, CommonModule
  ],
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.css']
})
export class BandeauComponent implements OnInit {
  isSessionActive: boolean = false;
  nom: string | undefined;
  prenom: string | undefined;
  constructor(private sessionService: SessionService, private authService : AuthService , private appComponent: AppComponent) {}

  // On initialise le bandeau
  // Et on vérifie si la session est active
  ngOnInit(): void {
    this.sessionService.sessionActive$.subscribe(isActive => {
      this.isSessionActive = isActive;
      this.nom = document.cookie.split(';').find(c => c.trim().startsWith('nom='))?.split('=')[1];
      this.prenom = document.cookie.split(';').find(c => c.trim().startsWith('prenom='))?.split('=')[1];
    });

  }
  
  /**
   * Fonction qui va appeler le authService pour se déconnecter
   * Si l'utilisateur est déconnecté on supprime les cookies et on vérifie la session pour mettre a jour le bandeau
   */
  logout() {
    const idSession = document.cookie.split(';').find(c => c.trim().startsWith('idSession='))?.split('=')[1];
    console.log('idSession :', idSession);
    if (idSession) {
      this.authService.logout(idSession).subscribe(
        response => {
          this.appComponent.setNotification('Déconnexion réussie', true);
            document.cookie = 'idSession=;';
            document.cookie = 'nom=;';
            document.cookie = 'prenom=;';
            document.cookie = 'idUser=;';
            this.sessionService.checkSessionActive();
        },
        error => {
          console.log('Erreur lors de la déconnexion', error);
          this.appComponent.setNotification('Erreur lors de la déconnexion', false);
        }
      );
    } else {

      this.appComponent.setNotification('Session ID non trouvé', false);
    }
  }

}