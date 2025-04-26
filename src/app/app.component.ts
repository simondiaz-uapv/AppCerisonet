import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BandeauComponent } from "./bandeau/bandeau.component";
import { MatIconModule } from '@angular/material/icon';
import { BandeauNotifComponent } from './bandeau-notif/bandeau-notif.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { SessionService } from './session.service';
import { MurComponent } from './mur/mur.component';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    BandeauComponent,
    MatIconModule,
    BandeauNotifComponent,
    LoginComponent,
    HttpClientModule,
    CommonModule,
    MurComponent,
],
  providers: [AuthService,SessionService,MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  notification: string | null = null;
  isSuccess: boolean = true;
  isSessionActive: boolean = false;
  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    // Vérifier l'état de la session lors de l'initialisation
    this.sessionService.checkSessionActive();
    this.sessionService.sessionActive$.subscribe(isActive => {
      this.isSessionActive = isActive;
    });
  }

  /**
   * Set le bandeau de notification
   * @param message Message d'erreur ou de succès
   * @param isSuccess Indicateur pour mettre en rouge ou vert en case de Succès/Echec
   */
  setNotification(message: string, isSuccess: boolean) {
    this.notification = message;
    this.isSuccess = isSuccess;
    setTimeout(() => {
      this.notification = null;
    }, 3000); 
  }

}
