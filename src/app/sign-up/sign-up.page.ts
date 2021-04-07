import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CustomValidators } from '../_helpers/custom-validators.validator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/api.service';
import { AlertService } from '../providers/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup;

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
    ],
    name: [
      { type: 'required', message: 'Name is required.' },
      { type: 'startOrEndContainSpace', message: 'Name either starts or ends with space.' }
    ],
    phone_number: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'startOrEndContainSpace', message: 'Phone number either starts or ends with space.' }
    ],
    city: [
      { type: 'required', message: 'Address is required.' },
      { type: 'startOrEndContainSpace', message: 'Address either starts or ends with space.' }
    ],
    location: [
      { type: 'required', message: 'location is required.' },
    ]
  };

  submitProfileDetails: boolean;
  countryCode = '+63';
  phone: any = '';
  phoneLength = 10;
  allLocations: any;

  constructor
 (
    private navController: NavController,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
    ) {
      this.submitProfileDetails = false;
      this.signUpForm = this.formBuilder.group({
        email_address: ['', [Validators.required, Validators.email, 
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), CustomValidators.cannotContainSpace]],
        password: ['', [Validators.required, Validators.minLength(6),
           Validators.maxLength(30), CustomValidators.cannotContainSpace]]
      });
    }

  ngOnInit() {
  }

  validEmailPassword(){
    const postData = this.signUpForm.value;

    this.apiService.clientEmailVerification(postData).subscribe(
      (responseData: any) => {
        if (CustomValidators.checkIfPropertyExistsInObject(responseData, 'error_message')){
          this.alertService.displayErrorAlert('Try Again', responseData.error_message);
        }else{
          this.submitProfileDetails = true;
          this.signUpForm = this.formBuilder.group({
            email_address: [postData.email_address, [Validators.required, Validators.email, 
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), CustomValidators.cannotContainSpace]],
            password: [postData.password, [Validators.required, Validators.minLength(6),
               Validators.maxLength(30), CustomValidators.cannotContainSpace]],
            name: ['', [Validators.required, CustomValidators.startOrEndContainSpace]],
            phone_number: ['', [Validators.required, CustomValidators.startOrEndContainSpace]],
            city: ['', [Validators.required, CustomValidators.startOrEndContainSpace]]
          });
          this.apiService.getLocations().subscribe((responseData: any) => {
            this.allLocations = responseData.locations;
          });
        }
      }
    );
  }

  inputPhone(event)
  {
    const val = event.target.value;
    this.phone = val;
    if (val.includes('+')) { this.phoneLength = 13; }
    else { this.phoneLength = 10; }
  }

  signUpUser()
  {
    const postData = this.signUpForm.value;
    postData.phone_number = postData.phone_number.includes('+') ?  postData.phone_number : this.countryCode + postData.phone_number;

    this.apiService.clientRegistration(postData).subscribe(
      (responseData: any) => {
        if (CustomValidators.checkIfPropertyExistsInObject(responseData, 'error_message')){
          this.alertService.displayErrorAlert('Try Again', responseData.error_message);
        }else{
          this.alertService.displayAlert('Okay', responseData.success_message).then(() => {
            this.navController.navigateRoot('');
          });
        }
      }
    );
  }

}
