import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGuestPage } from './add-guest.page';

const routes: Routes = [
  {
    path: '',
    component: AddGuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGuestPageRoutingModule {}
