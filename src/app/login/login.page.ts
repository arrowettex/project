import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomValidators } from '../_helpers/custom-validators.validator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/api.service';
import { DataService } from '../providers/data.service';
import { NavController } from '@ionic/angular';
import { AlertService } from '../providers/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  errorMessages = {
    email_address: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Should be valid email.' },
      { type: 'cannotContainSpace', message: 'Spaces (" ") are not allowed.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length should be between 6 to 30' },
      { type: 'maxlength', message: 'Password length should be between 6 to 30' },
      { type: 'cannotContainSpace', message: 'Spaces (" ") are not allowed.' }
    ]
  };

  constructor
 (
    private router: Router,
    public navController: NavController,
    private dataService: DataService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
    ) {
      this.loginForm = this.formBuilder.group({
        email_address: ['', [Validators.required, Validators.email, 
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), CustomValidators.cannotContainSpace]],
          password: ['', [Validators.required, Validators.minLength(6),
           Validators.maxLength(30), CustomValidators.cannotContainSpace]]
      });
    }

  ngOnInit() {
  }

  loginUser()
  {
    const postData = this.loginForm.value;

    this.apiService.loginClient(postData).subscribe(
      (responseData: any) => {
        if (CustomValidators.checkIfPropertyExistsInObject(responseData, 'error_message')){
          this.alertService.displayErrorAlert('Try Again', responseData.error_message);
        }else{
          localStorage.setItem('jobFlexClientToken', responseData.token);
          this.navController
            .navigateRoot('/home')
            .then(() => {
              this.getClientProfileData();
            });
        }
      }
    );
  }

  /* User Profile Details */
  getClientProfileData() {
    this.apiService.getClientDetails().subscribe((responseData: any) => {
      const clientData = {
        name: responseData.client_details.name,
        email: responseData.client_details.email_address
      };
      this.dataService.changeUserDetails(clientData);
    });
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
