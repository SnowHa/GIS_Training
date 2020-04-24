import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-bank-owner-full',
  templateUrl: './bank-owner-full.component.html',
  styleUrls: ['./bank-owner-full.component.scss']
})
export class BankOwnerFullComponent implements OnInit {

  constructor() { }
  onLinkClick(event: MatTabChangeEvent) {
    console.log('event => ', event.tab.textLabel);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
  }

  ngOnInit(): void {
  }

}
