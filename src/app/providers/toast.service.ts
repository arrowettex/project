import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async displayOnlyMessageToast(displayMessage: any, displayPosition: any = 'bottom', displayDuration: number = 3000) {
    const toast = await this.toastController.create({
      message: displayMessage,
      position: displayPosition,
      duration: displayDuration
    });
    toast.present();
  }

  async displayToastWithHeader(displayHeader: any, displayMessage: any, displayPosition: any = 'bottom', displayDuration: number = 3000) {
    const toast = await this.toastController.create({
      header: displayHeader,
      message: displayMessage,
      position: displayPosition,
      duration: displayDuration
    });
    toast.present();
  }

}
