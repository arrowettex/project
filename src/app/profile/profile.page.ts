import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DataService } from '../providers/data.service';
import { CustomValidators } from '../_helpers/custom-validators.validator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../providers/api.service';
import { AlertService } from '../providers/alert.service';

@Component
({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit
{
  profileUpdateForm: FormGroup;

  errorMessages = {
    name: [
      { type: 'required', message: 'Name is required.' },
      { type: 'startOrEndContainSpace', message: 'Name either starts or ends with space.' }
    ],
    phone_number: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'startOrEndContainSpace', message: 'Phone number either starts or ends with space.' }
    ],
    city: [
      { type: 'required', message: 'City is required.' },
      { type: 'startOrEndContainSpace', message: 'City either starts or ends with space.' }
    ],
    location: [
      { type: 'required', message: 'location is required.' },
    ]
  };

  countryCode = '+63';
  phoneLength = 10;
  allLocations: any;

  constructor
 (
    private loadingCtrl: LoadingController,
    private navController: NavController,
    private dataService: DataService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { 
    this.profileUpdateForm = this.formBuilder.group({
      name: ['', [Validators.required, CustomValidators.startOrEndContainSpace]],
      phone_number: ['', [Validators.required, CustomValidators.startOrEndContainSpace]],
      city: ['', [Validators.required, CustomValidators.startOrEndContainSpace]]
    });
  }

  ngOnInit()
  {
    this.apiService.getClientDetails().subscribe((responseData: any) => {
      this.profileUpdateForm.patchValue({
        name: responseData.client_details.name,
        email_address: responseData.client_details.email_address,
        phone_number: responseData.client_details.phone_number,
        city: responseData.client_details.city
      });
    });
    this.apiService.getLocations().subscribe((responseData: any) => {
      this.allLocations = responseData.locations;
    });
  }

  updateProfileDetails()
  {
    const postData = this.profileUpdateForm.value;
    postData.phone_number = postData.phone_number.includes('+') ?  postData.phone_number : this.countryCode + postData.phone_number;

    this.apiService.updateClientDetails(postData).subscribe(
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

  inputPhone(event)
  {
    const val = event.target.value;
    if (val.includes('+')) { this.phoneLength = 13; }
    else { this.phoneLength = 10; }
  }

}
