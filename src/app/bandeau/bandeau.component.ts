import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // ✅ Import nécessaire

@Component({
  selector: 'app-bandeau',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './bandeau.component.html',
  styleUrl: './bandeau.component.css'
})
export class BandeauComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
