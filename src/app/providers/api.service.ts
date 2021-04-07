import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: any = 'https://jobflexph.com/authority/api/client/';

  constructor(private http: HttpClient) { }

  /* Auth API */
  loginClient(data: any) {
    return this.http.post(`${this.apiUrl}login`, data);
  }

  clientEmailVerification(data: any) {
    return this.http.post(`${this.apiUrl}email_verify`, data);
  }

  clientRegistration(data: any) {
    return this.http.post(`${this.apiUrl}client_registration`, data);
  }

  passwordReset(data: any) {
    return this.http.post(`${this.apiUrl}forgot_password`, data);
  }

  getClientDetails() {
    return this.http.get(`${this.apiUrl}client_details`);
  }

  updateClientDetails(data: any) {
    return this.http.put(`${this.apiUrl}update_profile`, data);
  }

  updateClientPassword(data: any) {
    return this.http.post(`${this.apiUrl}change_password`, data);
  }
  /* Auth API */

  /* Other API */
  getLocations() {
    return this.http.get(`${this.apiUrl}locations`);
  }

  getServices() {
    return this.http.get(`${this.apiUrl}services`);
  }

  /* Other API */

}


