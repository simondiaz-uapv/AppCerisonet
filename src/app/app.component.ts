import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BandeauComponent } from "./bandeau/bandeau.component";
import { LoginComponent } from "./login/login.component";
import { MatIconModule } from '@angular/material/icon'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FormsModule, 
    BandeauComponent, 
    LoginComponent, 
    MatIconModule 
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'AppCerisonet';
  test = 'bonjour';
}
