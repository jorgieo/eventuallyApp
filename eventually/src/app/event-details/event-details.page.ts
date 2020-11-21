import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  items =[];

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.makeItems();
    console.log(this.route.snapshot.params);
  }

  makeItems(){
    for (let index = 0; index < 10; index++) {
      this.items.push(index + 1);
      
    }
  }

}
