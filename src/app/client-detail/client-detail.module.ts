import { ClientDetailComponent } from './client-detail.component';
import { ClientDetailRoutingModule } from './client-detail-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandeClientComponent } from './commande-client/commande-client.component';
import { VentesClientComponent } from './ventes-client/ventes-client.component';
import { ClientSurveyComponent } from './client-survey/client-survey.component';




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
    CommandeClientComponent,
    VentesClientComponent,
    ClientSurveyComponent
  ],
  providers: [],
})
export class ClientDetailModule { }
