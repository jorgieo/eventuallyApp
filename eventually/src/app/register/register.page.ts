import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user  = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController) {}

  ngOnInit() {
  }

  async register(user:User) {
    /** Create a user on Firebase authentication service. */

    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try {
        // Create user then resolve the user's ID.
        await this.afAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(data => this.user.uid = data.user.uid);

        // Add a document to the 'users' collection in firestore
        await this.firestore.collection('users').add({email:user.email,uid:user.uid});

        // Navigate to the home page
        this.navCtrl.navigateRoot(['/home', this.user.uid]);

      } catch (e) {
        this.showToast(e);
      }

      (await loader).dismiss();
    }
  }

  formValidation() {
    if (!this.user.email){
      this.showToast("Enter Email!");
      return false;
    }
    if (!this.user.password){
      this.showToast("Enter Password!");
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
