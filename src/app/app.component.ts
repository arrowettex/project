import { Component } from '@angular/core';

import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { DataService } from './providers/data.service';
import { ApiService } from './providers/api.service';

@Component
({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent
{
  userData: any;
  name: string;
  address: string;
  email: string;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private apiService: ApiService,
    private navController: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    if (localStorage.getItem('jobFlexClientToken')){
      this.getClientData();

      this.router.navigateByUrl('home');
    }
    else { this.router.navigateByUrl('startup'); }

  }

  logout() {
    localStorage.clear();
    const userData = {
      name: 'Your Name',
      email: 'Your Email'
    };
    this.dataService.changeUserDetails(userData);
    this.navController.navigateRoot('/startup');
  }

  goToProfile()
  {
    this.router.navigateByUrl('profile');
  }

  getClientData()
  {
    this.apiService.getClientDetails().subscribe((responseData: any) => {
      const clientData = {
        name: responseData.client_details.name,
        email: responseData.client_details.email_address
      };
      this.dataService.changeUserDetails(clientData);
      this.name = clientData.name;
      this.email = clientData.email;
    });
  }

}

