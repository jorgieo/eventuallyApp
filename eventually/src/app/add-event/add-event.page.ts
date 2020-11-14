import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Event } from '../../models/event.model'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  event = {} as Event;

  constructor(
    private toastCtrl:ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore) {}

    ngOnInit(){}

    async createEvent(event:Event) {
      // console.log(event);

      if(this.formValidation()){
        let loader = this.loadingCtrl.create({
          message: "Please wait..."
        });
        (await loader).present();

        event.date = event.date.split(/T(.+)/)[0];
        event.time = event.time.split(/T/)[1].slice(0,5);
  
        try {
          await this.firestore.collection('events').add(event);

        } catch (e) {
          this.showToast(e);
        }
  
        (await loader).dismiss();
  
        this.navCtrl.navigateRoot('home');
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
  
      return true
    }
  
    showToast(message:string) {
      this.toastCtrl.create({
        message: message,
        duration: 3000
      }).then(toastData => toastData.present());
    }

}
