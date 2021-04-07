import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allServices: any = [];
  searchTerm = '';
  services: any;

  constructor(
    private apiService: ApiService, private router: Router
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.apiService.getServices().subscribe((responseData: any) => {
      this.services = this.allServices = responseData.services;
    });
  }

  searchService(){
    this.allServices = this.services.filter(service => {
      return service.service_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  clickcard() {
    this.router.navigate(["/first-book"]);
   }


}
