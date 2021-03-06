import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage implements OnInit {
  eventid = this.route.snapshot.params.eventid;
  uid = this.route.snapshot.params.uid;
  guests:any;

  constructor(
    private route: ActivatedRoute,
    private toastCtrl:ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore) { }

  ngOnInit() {
  }

    // Use View Will Enter lifecycle to retrieve guest documents before the component loads
    ionViewWillEnter(){
      this.getGuests(this.eventid);
    }

    async getGuests(eventid:string) {
      /** Retrieves all guest objects from the firestore 'guests' collection */

      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try {
        /** Update guests property with the return of mapping the values emitted via snapshot changes from querying firestore.
         * The query is indexed by event ID and ordered ascending by name. */
        this.firestore.collection('guests', ref => ref.where('eventid', '==', eventid).orderBy('name', 'asc')).snapshotChanges()
        .subscribe(data => this.guests = data.map(element => {return {guestid: element.payload.doc.id,
                                                                  name: element.payload.doc.data()['name'],
                                                                  gender: element.payload.doc.data()['gender'],
                                                                  response: element.payload.doc.data()['response']
                                                              }}));

        (await loader).dismiss();

      } catch (error) {
        this.showToast(error);
      }
    }

    async deleteGuest(guestid:string){
      /** Deletes a document from 'guests' collection. */

      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();
  
      // Create a reference to a specific document ID in 'guests' then delete it.
      await this.firestore.doc('guests/' + guestid).delete();
  
      (await loader).dismiss();
    }
  
    showToast(message:string) {
      this.toastCtrl.create({
        message: message,
        duration: 3000
      }).then(toastData => toastData.present());
    }

}
