import { Component,  } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController} from 'ionic-angular';

import { CheckInPage } from '../checkin/checkin';
import { CheckInService } from '../../services/checkin.service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private checkinService: CheckInService, public modalCtrl: ModalController) {
    this.checkinService = checkinService;
    this.user = {
      email: '',
      password: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  authenticate(user) {
    this.checkinService.authenticate(user).then(data => {
      if(data) {
        this.navCtrl.setRoot(CheckInPage);
      }
    });
  }

  register() {
    let modal = this.modalCtrl.create(Signup);
    modal.present();
  }

}


@Component({
  selector: 'page-signup',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>S'inscrire</ion-title>
        <ion-buttons end>
          <button ion-button icon-only class="button button-icon" (click)="dismiss()">Fermer</button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>

    <ion-content padding>
      <form (submit)="signup(user)" #registerForm="ngForm">
        <ion-list inset>
          
          <ion-item>
            <ion-input type="text" placeholder="Nom" name="name" [(ngModel)]="user.name" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="user.email" required></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required></ion-input>
          </ion-item>
          
          <ion-item>
            <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Confirmer</button>
          </ion-item>

        </ion-list>
      </form>
    </ion-content>
  `
})
export class Signup {
  user: Object;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private checkinService: CheckInService) {
    this.checkinService = checkinService;
    this.user = {
      name: '',
      email: '',
      password: ''
    };
  }

  signup(user) {
    this.checkinService.signup(user).then(data => {
      if (data) {
        this.navCtrl.setRoot(CheckInPage);
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}