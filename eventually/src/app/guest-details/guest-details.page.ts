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
    console.log(guestid);

    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    this.firestore.doc('guests/' + guestid).valueChanges().subscribe(data => {
      if(data){
        // console.log(data);
        this.guest.name = data['name'];
        this.guest.email = data['email'];
        this.guest.gender = data['gender'];
        this.guest.response = data['response'];
      }
    });
    
    (await loader).dismiss();

  }

  selectedGender(event){
    this.guest.gender = event.detail.value;
  }

  selectedRSVP(event){
    this.guest.response = event.detail.value;
  }

  async updateGuest(){
    // update the guest in firestore

    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try {
        await this.firestore.doc('guests/' + this.guestid).update(this.guest);
        this.showToast("Guest Info Updated.")

      } catch (e) {
        console.log(e)
        this.showToast(e);
      }

      (await loader).dismiss();

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
