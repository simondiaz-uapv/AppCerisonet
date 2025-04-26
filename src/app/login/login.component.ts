import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { SessionService } from '../session.service';
import { BandeauComponent } from '../bandeau/bandeau.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel = {
    login: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private appComponent: AppComponent,
    private sessionService: SessionService,
  ) {}

  /**
   * Fonction qui va appeler le authService pour se connecter
   * Si l'utilisateur est connecté on set les cookies et la date dans le localStorage
   */
  onSubmit() {
    this.authService.login(this.loginModel.login, this.loginModel.password).subscribe(
      response => {
        console.log(response);
        if (response.success) {
          const lastLoginDate = localStorage.getItem('lastLoginDate');
          localStorage.setItem('lastLoginDate', new Date().toISOString());
          if (lastLoginDate) {
            this.appComponent.setNotification(`Connexion réussie ! Dernière connexion : ${new Date(lastLoginDate).toLocaleString()}`, true);
          } else {
            this.appComponent.setNotification('Connexion réussie !', true);
          }
          document.cookie = `idSession=${response.idSession};`;
          document.cookie = `idUser=${response.idUser};`;
          document.cookie = `lastDate=${new Date().toISOString()};`;
          document.cookie = `nom=${response.nom};`;
          document.cookie = `prenom=${response.prenom};`;
          this.sessionService.setSessionActive(true);
        } else {
          this.appComponent.setNotification(response.statusMsg, false);
        }
      },
      error => {
        this.appComponent.setNotification('Erreur de serveur', false);
      }
    );
  }

  
  
}