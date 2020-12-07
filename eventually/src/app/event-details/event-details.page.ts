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
    this.getEventById(this.eventid);
  }

  async getEventById(eventid:string){
    /** Retrieves a document from the firestore 'events' collection based a matching document ID */

    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    // Retrieve a document by subscribing to its valueChanges observable.
    // Note, onSnapshotChanges() is also valid.
    // If data is returned, the update all local event input fields via two-way binding.
    this.firestore.doc('events/' + eventid).valueChanges().subscribe(data => {
      if(data){
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
    /** Update a (whole) document in firestore*/

    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      // Update date by splitting the ISO date format returned by the date picker
      event.date = event.date.split(/T(.+)/)[0];

      try {
        await this.firestore.doc('events/' + this.eventid).update(event);

      } catch (e) {
        console.log(e)
        this.showToast(e);
      }

      (await loader).dismiss();

      // Navigate to the home page
      this.navCtrl.navigateRoot(['home', this.uid]);
    }
  }

  async cancelEvent(){
    /** Removed a document from the firestore 'events' collection.
     * Effectively cancelling the event.
     */

    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    // Delete event document based on document ID.
    await this.firestore.doc('events/' + this.eventid).delete();

    (await loader).dismiss();

    // Navigate to the home page
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
