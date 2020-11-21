import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Event } from '../../models/event.model'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  event = {} as Event;
  events:any;
  uid:string;


  constructor(
    private toastCtrl:ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private route: ActivatedRoute) { }

    // get events
    ionViewWillEnter(){
      this.uid = this.route.snapshot.params.uid;
      this.events = [];
      this.getEvents(this.uid);
    }

    async getEvents(uid:string) {
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();
      

      try {
        this.firestore.collection('events', ref => ref.where('userid', '==', uid).orderBy('date', 'asc')).snapshotChanges()
        .subscribe(data => data.map(element => this.events.push({eventid: element.payload.doc.id,
                                                                  eventdata: element.payload.doc.data()})));
        console.log(this.events);

        (await loader).dismiss();

      } catch (error) {
        this.showToast(error);
      }
    }
  
  
    showToast(message:string) {
      this.toastCtrl.create({
        message: message,
        duration: 3000
      }).then(toastData => toastData.present());
    }

}
