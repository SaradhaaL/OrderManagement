import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserLayoutComponent } from './user-layout.component';
import { OrdersComponent } from './orders/orders.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserLayoutComponent, OrdersComponent],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,

    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),

    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserLayoutModule { }
