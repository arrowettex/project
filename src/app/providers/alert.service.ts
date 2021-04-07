import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertContainer: any;

  constructor(public alertController: AlertController) { }

  async displayErrorAlert(buttonText = 'Try Again', displayMessage: any, subHeaderText: any = '') {
    if (subHeaderText === ''){
      this.alertContainer = await this.alertController.create({
        header: 'Oops..',
        mode: 'ios',
        message: displayMessage,
        buttons: [buttonText]
      });
    } else {
      this.alertContainer = await this.alertController.create({
        header: 'Oops..',
        mode: 'ios',
        subHeader: subHeaderText,
        message: displayMessage,
        buttons: [buttonText]
      });
    }

    this.alertContainer.present();
    await this.alertContainer.onDidDismiss();
  }

  async displayAlert(buttonText = 'Ok', displayMessage: any, subHeaderText: any = '') {
    if (subHeaderText === ''){
      this.alertContainer = await this.alertController.create({
        header: 'Done..',
        mode: 'ios',
        message: displayMessage,
        buttons: [buttonText]
      });
    } else {
      this.alertContainer = await this.alertController.create({
        header: 'Done..',
        mode: 'ios',
        subHeader: subHeaderText,
        message: displayMessage,
        buttons: [buttonText]
      });
    }

    this.alertContainer.present();
    await this.alertContainer.onDidDismiss();
  }

}
