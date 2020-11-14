import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Event } from '../../models/event.model'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  event = {} as Event;

  constructor(
    private toastCtrl:ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore) {}

    // get events
  
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
