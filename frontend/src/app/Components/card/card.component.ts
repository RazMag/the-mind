import { Component, OnInit } from '@angular/core';
import { Card } from '../../Models/Card';
import { fromEventPattern } from 'rxjs';
import { CardService } from '../../Services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cards:Card[];
  card = Math.floor(Math.random() * 99 + 1);

  constructor() {

  }

  ngOnInit(): void {
  }                      
}
