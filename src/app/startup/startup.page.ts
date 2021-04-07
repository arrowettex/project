import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {

  constructor
  ( 
    private authService:AuthService, 
    private router:Router,
    private alertCtrl:AlertController    
    ) { }

  ngOnInit() {
  }

  loginUser()
  {
    this.router.navigateByUrl('login');
  }

  goToReset()
  {
    this.router.navigateByUrl('password-reset');
  }

  goTosignUp()
  {
    this.router.navigateByUrl('sign-up');
  }
}
