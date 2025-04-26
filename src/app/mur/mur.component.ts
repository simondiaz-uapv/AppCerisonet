// filepath: mur.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-mur',
  templateUrl: './mur.component.html',
  styleUrls: ['./mur.component.css'],
  imports: [CommonModule, HttpClientModule, MessageComponent],
  standalone: true
})
export class MurComponent implements OnInit {
  messages: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getMessages().subscribe((messages: any[]) => {
      this.messages = messages;
    });
  }
}

