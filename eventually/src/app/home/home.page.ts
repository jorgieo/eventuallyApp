import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
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
  sub:any;


  constructor(
    private toastCtrl:ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController) { }

    // Use View Will Enter lifecycle to retrieve event documents before the component loads
    ionViewWillEnter(){
      this.uid = this.route.snapshot.params.uid;
      this.getEvents(this.uid);
    }

    async getEvents(uid:string) {
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();
      

      try {
        /** Update events property with the return of mapping the values emitted via snapshot changes from querying firestore.
         * The query is indexed by user ID and ordered ascending by date.
         * Saving returned subscription to observable to later unsubscribe on signout */
        this.sub = this.firestore.collection('events', ref => ref.where('userid', '==', uid).orderBy('date', 'asc')).snapshotChanges()
        .subscribe(data => this.events = data.map(element => {
          return {eventid: element.payload.doc.id,
          eventdata: element.payload.doc.data()
          };
        }));

        (await loader).dismiss();

      } catch (error) {
        this.showToast(error);
      }
    }

    async signOut(){
      /** Sign out from firebase and navigate to the default path. */

      await this.afAuth.signOut().then(() => {
        this.navCtrl.navigateRoot('/');
      }).catch((error) => {console.log(error)})
    }
  
  
    showToast(message:string) {
      this.toastCtrl.create({
        message: message,
        duration: 3000
      }).then(toastData => toastData.present());
    }

    // Unsubscribe before destroying the view
    ionViewWillLeave(){
      this.sub.unsubscribe();
    }

}
