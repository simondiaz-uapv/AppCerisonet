import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  imports: [CommonModule],
  providers: [DatePipe],
  standalone: true
})
export class MessageComponent implements OnInit {
  @Input() data: any;

  message: any = {};

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.message = this.data;
  }
  

  get createdBy(): string {
    return this.message?.createdBy;
  }

  get createdAt(): Date {
    return this.message?.createdAt;
  }

  get body(): string {
    return this.message?.body;
  }

  get likes(): number {
    return this.message?.likes;
  }

  get _id(): string {
    return this.message?._id;
  }

  get hashtags(): string[] {
    return this.message?.hashtags || [];
  }

  get avatar(): string {
    return this.message?.avatar || 'default-avatar.png';
  }

  get images(): { url: string; title: string }[] {
    if (this.message?.images && !Array.isArray(this.message.images)) {
      return [this.message.images];
    }
    return this.message?.images || [];
  }

  likeMessage(): void {
    const messageId = this._id;
    const idUser = this.getIdUserFromCookie();
    if (!messageId || !idUser) {
      console.error('Message ID ou Session ID manquant');
      return;
    }

    this.messageService.like(messageId, idUser).subscribe({
      next: (isLiked) => {
        this.messageService.updateLikes(isLiked);
        if(isLiked) {
          this.message.likes += 1;
          console.log('Message liked');
        } else {
          this.message.likes -= 1;
          console.log('Message unliked');
        }
        this.messageService.setCurrentMessage(this.message);
        this.triggerLikeAnimation();
      },
      error: (err) => {
        console.error('Erreur lors de l\'action de like/unlike', err);
      }
    });
  }

  triggerLikeAnimation(): void {
    const likesElement = document.querySelector(`#likes-${this._id}`);
    if (likesElement) {
      likesElement.classList.add('animate');
      setTimeout(() => likesElement.classList.remove('animate'), 300);
    }
  }

  getIdUserFromCookie(): string {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('idUser='));
    return cookie?.split('=')[1] || 'defaultUserId';
  }
}
