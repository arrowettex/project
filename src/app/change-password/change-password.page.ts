import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CustomValidators } from '../_helpers/custom-validators.validator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/api.service';
import { AlertService } from '../providers/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;

  errorMessages = {
    old_password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length should be between 6 to 30' },
      { type: 'maxlength', message: 'Password length should be between 6 to 30' },
      { type: 'cannotContainSpace', message: 'Spaces (" ") are not allowed.' }
    ],
    new_password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length should be between 6 to 30' },
      { type: 'maxlength', message: 'Password length should be between 6 to 30' },
      { type: 'cannotContainSpace', message: 'Spaces (" ") are not allowed.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length should be between 6 to 30' },
      { type: 'maxlength', message: 'Password length should be between 6 to 30' },
      { type: 'cannotContainSpace', message: 'Spaces (" ") are not allowed.' }
    ]
  };

  passwordNotMatch = false;

  constructor(
    public navController: NavController,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      new_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    }, {
      validators: this.matchUserPassword.bind(this)
    });
  }

  ngOnInit() {
  }

  updatePasswordDetails() {
    const postData = this.changePasswordForm.value;

    this.apiService.updateClientPassword(postData).subscribe(
      (responseData: any) => {
        if (CustomValidators.checkIfPropertyExistsInObject(responseData, 'error_message')){
          this.alertService.displayErrorAlert('Try Again', responseData.error_message);
        }else{
          this.alertService.displayAlert('Okay', responseData.success_message).then(() => {
            this.navController.navigateRoot('/home');
          });
        }
      }
    );
  }

  matchUserPassword(formGroup: FormGroup) {
    const password  = formGroup.get('new_password').value;
    const confirmPassword  = formGroup.get('confirm_password').value;
    if (password === confirmPassword) {
      this.passwordNotMatch = false;
      formGroup.controls.confirm_password.setErrors(null);
      return null;
    } else if (password !== '' || confirmPassword !== '') {
      this.passwordNotMatch = true;
      formGroup.controls.confirm_password.setErrors({ incorrect: true});
      return true;
    }
  }

}
