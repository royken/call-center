import { ClientDetailComponent } from './client-detail.component';
import { ClientDetailRoutingModule } from './client-detail-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandeClientComponent } from './commande-client/commande-client.component';




@NgModule({
  imports: [
    CommonModule,
    ClientDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    ClientDetailComponent,
    CommandeClientComponent
  ],
  providers: [],
})
export class ClientDetailModule { }
