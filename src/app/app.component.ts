import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BandeauComponent } from "./bandeau/bandeau.component";
import { MatIconModule } from '@angular/material/icon';
import { BandeauNotifComponent } from './bandeau-notif/bandeau-notif.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { SessionService } from './session.service';
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
    CommonModule
],
  providers: [AuthService,SessionService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  notification: string | null = null;
  isSuccess: boolean = true;
  
  setNotification(message: string, isSuccess: boolean) {
    this.notification = message;
    this.isSuccess = isSuccess;
    setTimeout(() => {
      this.notification = null;
    }, 3000); // Masquer la notification après 3 secondes
  }

}
