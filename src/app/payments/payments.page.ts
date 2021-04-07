import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  constructor(public alertController: AlertController, private router: Router) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Service booked!',
      message: 'Thank you for using Jobflex!',
      buttons: ['OK']
    });
    await alert.present();
    this.router.navigate(["/summary"])
  }


  ngOnInit() {
  }

}
