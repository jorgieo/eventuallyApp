import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestDetailsPageRoutingModule } from './guest-details-routing.module';

import { GuestDetailsPage } from './guest-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestDetailsPageRoutingModule
  ],
  declarations: [GuestDetailsPage]
})
export class GuestDetailsPageModule {}
