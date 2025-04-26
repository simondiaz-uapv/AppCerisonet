import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login-information-component.component.html',
  styleUrls: ['./login-information-component.component.css']
})
export class LoginComponent implements OnInit {
  lastLogin: string | null = null;

  ngOnInit() {
    this.lastLogin = localStorage.getItem('lastLogin');
  }

  onLoginSuccess() {
    const now = new Date().toLocaleString();
    localStorage.setItem('lastLogin', now);
    this.lastLogin = now;
  }
}