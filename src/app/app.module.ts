import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProfilComponent } from './profil/profil.component';
import { MurComponent } from './mur/mur.component';
import { LoginComponent } from './login/login.component';
import { BandeauComponent } from './bandeau/bandeau.component';
import { BandeauNotifComponent } from './bandeau-notif/bandeau-notif.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProfilComponent,
    MurComponent,
  ],
  imports: [
    BandeauNotifComponent,
    LoginComponent,
    AppComponent,
    BandeauComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule, 
  ],
  providers: [],
})
export class AppModule { }