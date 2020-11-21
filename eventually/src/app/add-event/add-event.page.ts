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
      this.uid = this.route.snapshot.params.uid;
      // console.log(this.uid)
      // initialize optional event properties
      this.event.venue = '';
    }

    async createEvent(event:Event) {

      if(this.formValidation()){
        let loader = this.loadingCtrl.create({
          message: "Please wait..."
        });
        (await loader).present();

        event.userid = this.uid;
        event.date = event.date.split(/T(.+)/)[0];
        event.time = event.time.split(/T/)[1].slice(0,5);
        event.venue = event.venue;
  
        try {
          await this.firestore.collection('events').add(event);

        } catch (e) {
          console.log(e)
          this.showToast(e);
        }
  
        (await loader).dismiss();
  
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
