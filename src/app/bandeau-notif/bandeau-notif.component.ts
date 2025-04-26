import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bandeau-notif',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './bandeau-notif.component.html',
  styleUrls: ['./bandeau-notif.component.css']
})
export class BandeauNotifComponent {
  @Input() notification: string | null = null;
  @Input() isSuccess: boolean = true;
}