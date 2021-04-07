import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BookPageRoutingModule } from './book-routing.module';
import { MbscModule } from '@mobiscroll/angular';
import { BookPage } from './book.page';


@NgModule({
  imports: [
    CommonModule,
    MbscModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookPageRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    Ionic4DatepickerModule
  ],
  declarations: [BookPage]
})
export class BookPageModule {}
