import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  items =[];

  constructor() { }

  ngOnInit() {
    this.makeItems();
  }

  makeItems(){
    for (let index = 0; index < 10; index++) {
      this.items.push(index + 1);
      
    }
  }

}
