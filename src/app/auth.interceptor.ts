import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { AlertService } from './providers/alert.service';
import { NavController, ModalController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isAlertAvailable = false;

  constructor( public navController: NavController, public alertService: AlertService,
               public router: Router, private modalController: ModalController ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUrl = request.url;
    let accessToken = '';
    if (currentUrl.includes('/client/')) {
      accessToken = localStorage.getItem('jobFlexClientToken');
    }

    request = request.clone({
      setHeaders: {
        Accept       : 'application/json',
        Authorization: `${accessToken}`,
      },
    });

    return next.handle(request).pipe(
      catchError((error) => this.handleError(error))
    );

  }

  handleError(error: HttpErrorResponse) {
    // console.log(error);
    if (error.status === 401) {
      if (!this.isAlertAvailable) {
        this.isAlertAvailable = true;
        this.alertService.displayErrorAlert('Try Again', 'Please login to get access!', error.statusText).then(async () => {
          const activeModal = await this.modalController.getTop();
          if (activeModal) {
            activeModal.dismiss();
          }
          localStorage.clear();
          this.navController.navigateRoot('/login');
          this.isAlertAvailable = false;
        });
      }
    } else if (error.status === 500 || error.status === 404) {
      if (!this.isAlertAvailable) {
        this.isAlertAvailable = true;
        this.alertService.displayErrorAlert('Try Again', 'Something went wrong!Please try later.').then(async () => {
          const activeModal = await this.modalController.getTop();
          if (activeModal) {
            activeModal.dismiss();
          }
          this.isAlertAvailable = false;
        });
      }
    } else if (error.status === 422 && error.error.errors !== undefined) {
      if (!this.isAlertAvailable) {
        this.isAlertAvailable = true;
        this.alertService.displayErrorAlert('Try Again', error.error.errors.mobile).then(async () => {
          const activeModal = await this.modalController.getTop();
          if (activeModal) {
            activeModal.dismiss();
          }
          this.isAlertAvailable = false;
        });
      }
    } else {
      if (!this.isAlertAvailable) {
        this.isAlertAvailable = true;
        this.alertService.displayErrorAlert('Try Again', error.error.error).then(async () => {
          const activeModal = await this.modalController.getTop();
          if (activeModal) {
            activeModal.dismiss();
          }
          this.isAlertAvailable = false;
        });
      }
    }
    return EMPTY;
  }
}
