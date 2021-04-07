import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if ((control.value !== null || matchingControl.value !== null) && (control.value !== matchingControl.value)) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

// custom validator to validate that two dates are valid
export function ValidateDates(controlName: string, compareControlName: string) {
    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const compareControl = formGroup.controls[compareControlName];
        let newStartDate = 0;
        let newEndDate = 0;
        let controlDateString = "";
        let compareControlDateString = "";
        
        if (compareControl.errors && !compareControl.errors.validateDates) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        if (control.value !== null && control.value != ''){
        	controlDateString = control.value.toString();
            controlDateString = controlDateString.replace("05:30:00", "00:00:00");
            newStartDate = new Date(controlDateString).getTime();
        }
        if (compareControl.value !== null && compareControl.value != ''){
        	compareControlDateString = compareControl.value.toString();
            compareControlDateString = compareControlDateString.replace("05:30:00", "00:00:00");
            newEndDate = new Date(compareControlDateString).getTime();
        }
        
        // set error on matchingControl if validation fails
        if (control.value !== null && control.value != '' && compareControl.value != '' && compareControl.value !== null && newEndDate < newStartDate){
                compareControl.setErrors({ validateDates: true });
        } else {
            compareControl.setErrors(null);
        }
    }
}

// custom validator to validate that two dates are valid
export function ValidateTimes(controlName: string, compareControlName: string) {
    
    return (formGroup: FormGroup) => {
        const controlDate = formGroup.controls[controlName+"_date"];
        const compareControlDate = formGroup.controls[compareControlName+"_date"];
        const controlTime = formGroup.controls[controlName+"_time"];
        const compareControlTime = formGroup.controls[compareControlName+"_time"];
        const timeObject = new Date(controlTime.value);
        const compareTimeObject = new Date(compareControlTime.value);
        
        let newStartTime = 0;
        let newEndTime = 0;
        
        if (compareControlTime.errors && !compareControlTime.errors.validateTimes) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        if (controlTime.value !== null && controlTime.value != ''){
            if (controlDate.value !== null && controlDate.value != ''){
                let timeControl = ((timeObject.getHours() < 10) ? "0"+timeObject.getHours():timeObject.getHours())+":"+timeObject.getMinutes()+":00";
                let controlDateString = controlDate.value.toString();
                controlDateString = controlDateString.replace("00:00:00", timeControl);
                newStartTime = new Date(controlDateString).getTime();
            }else{
                newStartTime = timeObject.getTime();
            }
        }

        if (compareControlTime.value !== null && compareControlTime.value != ''){
            if (compareControlDate.value !== null && compareControlDate.value != ''){
                let timeCompareControl = ((compareTimeObject.getHours() < 10) ? "0"+compareTimeObject.getHours():compareTimeObject.getHours())+":"+compareTimeObject.getMinutes()+":00";
                let compareControlDateString = compareControlDate.value.toString();
                compareControlDateString = compareControlDateString.replace("00:00:00", timeCompareControl);
                newEndTime = new Date(compareControlDateString).getTime();
            }else{
                newEndTime = compareTimeObject.getTime();
            }
        }

        // set error on matchingControl if validation fails
        if (controlTime.value !== null && controlTime.value != '' && compareControlTime.value != '' && compareControlTime.value !== null && newEndTime <= newStartTime){
            compareControlTime.setErrors({ validateTimes: true });
        } else {
            compareControlTime.setErrors(null);
        }
    }
}