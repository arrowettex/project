import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value !== null) && (control.value as string).indexOf(' ') >= 0){
            return {cannotContainSpace: true}
        }
  
        return null;
    }

    static startOrEndContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value !== null) && ((control.value as string).startsWith(' ') || (control.value as string).endsWith(' '))){
            return {startOrEndContainSpace: true}
        }
  
        return null;
    }

    static checkIfPropertyExistsInObject(object: any, propertyName: any) {
        return Object.prototype.hasOwnProperty.call(object, propertyName);
    }
}
