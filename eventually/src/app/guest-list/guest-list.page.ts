import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage implements OnInit {
  eventid = this.route.snapshot.params.eventid;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.eventid);
  }

}
