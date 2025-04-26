import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css'],
  standalone: true
})
export class CommentaireComponent {
  @Input() _id?: string;
  @Input() text: string;
  @Input() commentedBy: number;
  @Input() date: string;
  @Input() hour: string;

  constructor(@Inject('data') data:any) {
    this._id = data._id;
    this.text = data.text;
    this.commentedBy = data.commentedBy;
    this.date = data.date;
    this.hour = data.hour;
  }
}