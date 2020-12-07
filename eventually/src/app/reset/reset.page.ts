import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  user  = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController) {}

  ngOnInit() {
  }

  // TODO: method to send email to admin

  async reset(email: string) {
    /** Trigger a password reset email from the Firebase authentication service. */

    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });

      (await loader).present();

      try {
        // Send email to the provided address and return to the login screen
        this.showToast(`Email Sent to: ${email}`)
        await this.afAuth.sendPasswordResetEmail(
          email, 
          { url: '/' });
      
        } catch (e) {
        this.showToast(e);
      }

      (await loader).dismiss();

      // Navigate to the default path clearing the URL tree (root)
      this.navCtrl.navigateRoot("/");
      
    };
  } 

  formValidation() {
    if (!this.user.email){
      this.showToast("Enter Email!");
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
