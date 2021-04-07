import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';

const now = new Date();

@Component({
  selector: "app-book",
  templateUrl: "book.page.html",
  styleUrls: ["book.page.scss"]
})
export class BookPage {
  
  datePickerObj: any = {};
  selectedDate: any;

  myDate = ''; 
	ionicForm: FormGroup;
	isSubmitted = false;

 constructor(private formBuilder: FormBuilder, private router: Router, public modalCtrl: ModalController) {}
  
 ngOnInit() {
  this.ionicForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  })

  let disabledDates: Date[] = [
    new Date(1545911005644),     
    new Date(),     
    new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.     
    new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format     
    new Date('12-14-2018'), // Short format
  ];

   this.datePickerObj = {
      inputDate: new Date(), // default new Date()
      fromDate: new Date('2020-01-01'), // default null
      toDate: new Date('2030-01-01'), // default null
			showTodayButton: true, // default true
      closeOnSelect: false, // default false
      disableWeekDays: [], // default []
      mondayFirst: true, // default false
      setLabel: 'Set',  // default 'Set'
			todayLabel: 'Today', // default 'Today'
			closeLabel: 'Close', // default 'Close'
      disabledDates: [], // default []
      titleLabel: 'Select a Date', // default null
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
			dateFormat: 'MMMM DD YYYY', // default DD MMM YYYY
			clearButton : true , // default true
      momentLocale: 'en-US', // Default 'en-US'
			yearInAscending: true, // Default false
			btnCloseSetInReverse: false, // Default false
	
		btnProperties: {
    expand: 'block', // Default 'block'
    fill: '', // Default 'solid'
    size: '', // Default 'default'
    disabled: '', // Default false
    strong: '', // Default false
    color: '' // Default ''
  },
			
	highlightedDates: [
		{ date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
		{ date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
      ] // Default [],
    };
  };

get errorControl() {
  return this.ionicForm.controls;
}

submitForm() {
  this.isSubmitted = true;
  if (!this.ionicForm.valid) {
    console.log('Please provide all the required values!')
    return false;
  } else {
    console.log(this.ionicForm.value)
    this.router.navigate(["/payments"])
  }
}


  // get name() {
  //   return this.bookForm.get("name");
  // }
  // get email() {
  //   return this.bookForm.get('email');
  // }
  // get phone() {
  //   return this.bookForm.get('phone');
  // }
  // get street() {
  //   return this.bookForm.get('address.street');
  // }
  // get city() {
  //   return this.bookForm.get('address.city');
  // }
  // get zip() {
  //   return this.bookForm.get('address.zip');
  // }
  // public errorMessages = {
  //   name: [
  //     { type: 'required', message: 'Name is required' },
  //     { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
  //   ],
  //   email: [
  //     { type: 'required', message: 'Email is required' },
  //     { type: 'pattern', message: 'Please enter a valid email address' }
  //   ],
  //   phone: [
  //     { type: 'required', message: 'Phone number is required' },
  //     { type: 'pattern', message: 'Please enter a valid phone number' }
  //   ],
  //   street: [
  //     { type: 'required', message: 'Street name is required' },
  //     {
  //       type: 'maxlength',
  //       message: 'Street name cant be longer than 100 characters'
  //     }
  //   ],
  //   city: [
  //     { type: 'required', message: 'City name is required' },
  //     {
  //       type: 'maxlength',
  //       message: 'City name cant be longer than 100 characters'
  //     }
  //   ],
  //   zip: [
  //     { type: 'required', message: 'Zip code is required' },
  //     {
  //       type: 'pattern',
  //       message: 'Please enter a valid zip code'
  //     }
  //   ]
  // };
  // bookForm = this.formBuilder.group({
  //   name: ['', [Validators.required, Validators.maxLength(100)]],
  //   email: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
  //     ]
  //   ],
  //   phone: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
  //     ]
  //   ],
  //   address: this.formBuilder.group({
  //     street: ['', [Validators.required, Validators.maxLength(100)]],
  //     city: ['', [Validators.required, Validators.maxLength(100)]],
  //     state: ['', [Validators.required, Validators.maxLength(100)]],
  //     zip: [
  //       '',
  //       [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]
  //     ]
  //   })
  // });

  // public submit() {
  //   console.log(this.formBuilder)
  //   this.router.navigate(["/calendar"]);
  // }


}
