import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

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

  constructor(private sessionService: SessionService, private authService : AuthService) {}

  ngOnInit(): void {
    this.isSessionActive = this.sessionService.isSessionActiveFonction();
    this.sessionService.sessionActive$.subscribe(
      isActive => {
        this.isSessionActive = isActive;
        console.log('état de la session dans bandeau :', isActive);
      },
      error => {
        console.error('Erreur lors de la vérification de la session', error);
      }
    );
  }
  logout(): void {
    this.authService.logout();
    this.sessionService.setSessionActive(false);
  }
}