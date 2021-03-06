import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  async login(user:User) {
    /** Authenticate the user via Firebase auth Angular API */

    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try {
        // Pass email and password to AngularFireAuth. Then resolve the user's Firebase ID.
        await this.afAuth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(data => this.user.uid = data.user.uid);

        // Navigate to the home page clearing the URL tree (root).
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
