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
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { CommentaireComponent } from './commentaire/commentaire.component';

@NgModule({
  declarations: [
    ProfilComponent,
  ],
  imports: [
    BandeauNotifComponent,
    LoginComponent,
    AppComponent,
    BandeauComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    MurComponent,
    CommonModule,
    MessageComponent,
    CommentaireComponent
  ],
  providers: [],
})
export class AppModule { }