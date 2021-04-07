import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../_helpers/custom-validators.validator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/api.service';
import { NavController } from '@ionic/angular';
import { AlertService } from '../providers/alert.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  passwordResetForm: FormGroup;

  errorMessages = {
    email_address: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Should be valid email.' },
      { type: 'cannotContainSpace', message: 'Spaces (" ") are not allowed.' }
    ]
  };

  constructor
 (
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private navController: NavController
    ) {
      this.passwordResetForm = this.formBuilder.group({
        email_address: ['', [Validators.required, Validators.email, 
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), CustomValidators.cannotContainSpace]]
      });
    }

  ngOnInit() {
  }

  async resetPassword()
  {
    const postData = this.passwordResetForm.value;

    this.apiService.passwordReset(postData).subscribe(
      (responseData: any) => {
        if (CustomValidators.checkIfPropertyExistsInObject(responseData, 'error_message')){
          this.alertService.displayErrorAlert('Try Again', responseData.error_message);
        }else{
          this.alertService.displayAlert('Okay', responseData.success_message, 'Password reset successful').then(() => {
            localStorage.clear();
            this.navController.navigateRoot('/startup');
          });
        }
      }
    );
  }

}
