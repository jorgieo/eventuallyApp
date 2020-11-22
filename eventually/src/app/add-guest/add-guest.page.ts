import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Guest } from 'src/models/guest.model';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.page.html',
  styleUrls: ['./add-guest.page.scss'],
})
export class AddGuestPage implements OnInit {
  guest = {} as Guest;
  uid = this.route.snapshot.params.uid;
  eventid = this.route.snapshot.params.eventid;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private toastCtrl:ToastController) { }

  ngOnInit() {
  }

  selectedGender(event){
    this.guest.gender = event.detail.value;
  }

  selectedRSVP(event){
    this.guest.response = event.detail.value;
  }

  async addGuest(){
    if(!this.guest.gender){
      this.guest.gender = 'n';
    }
    if(!this.guest.response){
      this.guest.response = 'Waiting';
    }
    
    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      this.guest.eventid = this.eventid;
      this.guest.uid = this.uid;

      try {
        await this.firestore.collection('guests').add(this.guest);

      } catch (e) {
        console.log(e)
        this.showToast(e);
      }

      (await loader).dismiss();

      this.navCtrl.navigateBack(['home',this.uid,'event-details',this.eventid,'guest-list']);
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
