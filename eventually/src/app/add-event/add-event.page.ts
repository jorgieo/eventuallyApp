import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Event } from '../../models/event.model'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  event = {} as Event;
  uid:string;

  constructor(
    private toastCtrl:ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private route: ActivatedRoute) {}

    ngOnInit(){
      // save the user ID passed in the route params
      this.uid = this.route.snapshot.params.uid;

      // initialize optional event properties
      this.event.venue = '';
    }

    async createEvent(event:Event) {
      /* Creates a firestore document in the events collection. */

      // Check if required inputs are filled
      if(this.formValidation()){
        let loader = this.loadingCtrl.create({
          message: "Please wait..."
        });
        (await loader).present();

        // Update the event user ID with the route param
        event.userid = this.uid;

        // Update the event date by splitting the ISO date format
        event.date = event.date.split(/T(.+)/)[0];

        // Update the event time by splitting the ISO date format
        event.time = event.time.split(/T/)[1].slice(0,5);

        // Update the event venue
        event.venue = event.venue;
        
        // Add the event object as a document in the firestore 'events' collection
        try {
          await this.firestore.collection('events').add(event);

        } catch (e) {
          console.log(e)
          this.showToast(e);
        }
  
        (await loader).dismiss();
        
        // Return to the home screen
        this.navCtrl.navigateRoot(['home', this.uid]);
      }
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
