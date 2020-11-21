import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Event } from 'src/models/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event = {} as Event;
  eventid = this.route.snapshot.params.eventid;

  constructor(
    private route:ActivatedRoute,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
    this.getEventById(this.eventid);
  }

  async getEventById(eventid:string){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    this.firestore.doc('events/' + eventid).valueChanges().subscribe(data => {
      this.event.title = data['title'];
      this.event.details = data['details'];
      this.event.venue = data['venue'];
      this.event.date = data['date'];
      this.event.time = data['time'];
      console.log(data);
    });
    
    (await loader).dismiss();
  }

}
