import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { avatars } from '../../assets/avatars'

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage implements OnInit {
  eventid = this.route.snapshot.params.eventid;
  uid = this.route.snapshot.params.uid;
  avatar = avatars.male_avatar;
  guests:any;

  constructor(
    private route: ActivatedRoute,
    private toastCtrl:ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  
    // get events
    ionViewWillEnter(){
      this.guests = [];
      this.getGuests(this.eventid);
    }

    async getGuests(eventid:string) {
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try {
        this.firestore.collection('guests', ref => ref.where('eventid', '==', eventid).orderBy('name', 'asc')).snapshotChanges()
        .subscribe(data => data.map(element => this.guests.push({guestid: element.payload.doc.id,
                                                                  name: element.payload.doc.data()['name'],
                                                                  gender: element.payload.doc.data()['gender'],
                                                                  response: element.payload.doc.data()['response']
                                                              })));
        console.log(this.guests);

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
