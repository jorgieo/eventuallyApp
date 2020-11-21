import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Event } from 'src/models/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event = {} as Event;
  eventid = this.route.snapshot.params.eventid;
  uid = this.route.snapshot.params.uid;

  constructor(
    private route:ActivatedRoute,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController) { }

  ngOnInit() {
    // console.log(this.route.snapshot.params);
    this.getEventById(this.eventid);
  }

  async getEventById(eventid:string){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    this.firestore.doc('events/' + eventid).valueChanges().subscribe(data => {
      if(data){
        // console.log(data);
        this.event.title = data['title'];
        this.event.details = data['details'];
        this.event.venue = data['venue'];
        this.event.date = data['date'];
        this.event.time = data['time'];
      }
    });
    
    (await loader).dismiss();
  }

  async updateEvent(event){
    // update the event in firestore

    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      event.date = event.date.split(/T(.+)/)[0];

      try {
        await this.firestore.doc('events/' + this.eventid).update(event);

      } catch (e) {
        console.log(e)
        this.showToast(e);
      }

      (await loader).dismiss();

      this.navCtrl.navigateRoot(['home', this.uid]);
    }
  }

  async cancelEvent(){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    await this.firestore.doc('events/' + this.eventid).delete();

    (await loader).dismiss();

    this.navCtrl.navigateRoot(['home', this.uid]);
  }

  formValidation() {
    if (!this.event.title){
      this.showToast("Enter Title!");
      return false;
    }
    if (!this.event.date){
      this.showToast("Select Date!");
      return false;
    }
    if (!this.event.time){
      this.showToast("Pick a Time!");
      return false;
    }

    return true
  }

  showToast(message:string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}
