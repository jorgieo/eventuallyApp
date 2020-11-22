import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGuestPageRoutingModule } from './add-guest-routing.module';

import { AddGuestPage } from './add-guest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGuestPageRoutingModule
  ],
  declarations: [AddGuestPage]
})
export class AddGuestPageModule {}
