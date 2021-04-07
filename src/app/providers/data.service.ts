import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userDetails = new BehaviorSubject<any>({name: 'Your Name', email: 'Your Email'});
  currentUserDetails = this.userDetails.asObservable();

  constructor() { }

  changeUserDetails(userData) {
    this.userDetails.next(userData);
  }

}
