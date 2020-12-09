import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Guest } from 'src/models/guest.model';

@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.page.html',
  styleUrls: ['./guest-details.page.scss'],
})
export class GuestDetailsPage implements OnInit {
  eventid = this.route.snapshot.params.eventid;
  guestid = this.route.snapshot.params.guestid;
  uid = this.route.snapshot.params.uid;
  guest = {} as Guest;

  constructor(
    private route:ActivatedRoute,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.getGuestById(this.guestid);
  }

  async getGuestById(guestid:string){
    /** Retrieve a document from the firestore 'guests' collection based on document ID. */

    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    
    // Retrieve a document by subscribing to its valueChanges observable.
    // Note, onSnapshotChanges() is also valid.
    // If data is returned, the update all local event input fields via two-way binding.
    this.firestore.doc('guests/' + guestid).valueChanges().subscribe(data => {
      if(data){
        this.guest.name = data['name'];
        this.guest.email = data['email'];
        this.guest.gender = data['gender'];
        this.guest.response = data['response'];
      }
    });
    
    (await loader).dismiss();

  }

  selectedGender(event){
    /** Update the gender field from the value emitted by the radio button event. */
    this.guest.gender = event.detail.value;
  }

  selectedRSVP(event){
    /** Update the response field from the value emitted by the radio button event. */
    this.guest.response = event.detail.value;
  }

  async updateGuest(){
    /** Update a (whole) document in the 'guests' collection based on document ID. */

    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try {
        // Update firestore object with guest object
        await this.firestore.doc('guests/' + this.guestid).update(this.guest);
        this.showToast("Guest Info Updated.")

      } catch (e) {
        console.log(e)
        this.showToast(e);
      }

      (await loader).dismiss();

      // Navigate back to the guest list
      this.navCtrl.navigateBack(['home', this.uid, 'event-details', this.eventid, 'guest-list']);
    }
  }

  formValidation() {
    if (!this.guest.name){
      this.showToast("Enter Guest Name!");
      return false;
    }
    if (!this.guest.email){
      this.showToast("Enter Guest Email!");
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
