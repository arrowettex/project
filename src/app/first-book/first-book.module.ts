import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstBookPageRoutingModule } from './first-book-routing.module';

import { FirstBookPage } from './first-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstBookPageRoutingModule
  ],
  declarations: [FirstBookPage]
})
export class FirstBookPageModule {}
