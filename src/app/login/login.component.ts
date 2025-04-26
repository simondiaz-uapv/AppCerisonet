import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
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
    private sessionService: SessionService
  ) {}

  onSubmit() {
    this.authService.login(this.loginModel.login, this.loginModel.password).subscribe(
      response => {
        console.log(response);
        if (response.success) {
          this.appComponent.setNotification('Connexion réussie', true);
          sessionStorage.setItem('user', this.loginModel.login);
          sessionStorage.setItem('lastLoginDate', new Date().toISOString());
          this.sessionService.setSessionActive(true);
            document.cookie = `sessionId=${response.sessionId}; path=/; secure; HttpOnly`;
        } else {
          this.appComponent.setNotification('Échec de la connexion', false);
        }
      },
      error => {
        this.appComponent.setNotification('Erreur de serveur', false);
      }
    );
  }

  onLogout() {
    this.authService.logout().subscribe(
      response => {
        this.appComponent.setNotification('Déconnexion réussie', true);
        sessionStorage.removeItem('user');
        this.sessionService.setSessionActive(false);
      },
      error => {
        this.appComponent.setNotification('Erreur lors de la déconnexion', false);
      }
    );
  }
}