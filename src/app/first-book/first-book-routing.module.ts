import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstBookPage } from './first-book.page';

const routes: Routes = [
  {
    path: '',
    component: FirstBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstBookPageRoutingModule {}
